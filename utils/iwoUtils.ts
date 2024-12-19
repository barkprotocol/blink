import { useState, useEffect } from 'react';
import { Connection, PublicKey, clusterApiUrl, Transaction, SystemProgram, sendAndConfirmTransaction, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Program, AnchorProvider, web3 as anchorWeb3 } from '@project-serum/anchor';

export const TOTAL_SUPPLY = 18_446_744_073;
export const CIRCULATING_SUPPLY = 18_228_391_052.057774;
export const LOCKED_SUPPLY = 2_999_688_600;
export const MAX_SUPPLY = 18_446_744_073;

export interface Bid {
  id: string;
  userId: string;
  amount: number;
  vestingPeriod: number;
  weight: number;
  transactionSignature: string;
  timestamp: string;
}

const BARK_TOKEN_MINT_ADDRESS = new PublicKey(process.env.NEXT_PUBLIC_TOKEN_PROGRAM_ID || '');
const IWO_POOL_ID = new PublicKey(process.env.NEXT_PUBLIC_IWO_CONTRACT_ADDRESS || '');
const VESTING_PROGRAM_ID = new PublicKey('GKb2vF9RE1UPhV6hQi7yiL5tCsdajbJHyTm87zhN3qiU');

let connection: Connection;
let program: Program;

export async function initializeSolanaConnection() {
  connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL || '', 'confirmed');
  const provider = new AnchorProvider(connection, (window as any).solana, { preflightCommitment: 'confirmed' });
  // Initialize the program here (you'll need to import your IDL)
  // program = new Program(idl, PROGRAM_ID, provider);
}

export async function initializeMultiChainConnection(chain: 'solana' | 'sui') {
  if (chain === 'solana') {
    await initializeSolanaConnection();
  } else if (chain === 'sui') {
    // Initialize SUI connection (placeholder for future implementation)
    console.log('SUI connection not yet implemented');
  }
}

export async function fetchBARKTokenSupply(): Promise<number> {
  const tokenSupply = await connection.getTokenSupply(BARK_TOKEN_MINT_ADDRESS);
  return tokenSupply.value.uiAmount || 0;
}

export async function fetchAllocatedTokens(): Promise<number> {
  const iwoAccount = await connection.getAccountInfo(IWO_POOL_ID);
  // Parse iwoAccount data to get allocated tokens
  // This is a placeholder implementation
  return CIRCULATING_SUPPLY - LOCKED_SUPPLY;
}

export function calculateBidWeight(amount: number, vestingPeriod: number): number {
  return amount * (1 + vestingPeriod / 12);
}

export function calculateTokenAllocation(bid: Bid, totalWeight: number, availableTokens: number): number {
  return (bid.weight / totalWeight) * availableTokens;
}

export async function submitBidToBlockchain(amount: number, vestingPeriod: number, walletAddress: string): Promise<string> {
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: new PublicKey(walletAddress),
      toPubkey: IWO_POOL_ID,
      lamports: LAMPORTS_PER_SOL * amount,
    })
  );

  const signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [/* Add your wallet keypair here */]
  );

  return signature;
}

export function formatNumber(num: number): string {
  return num.toLocaleString();
}

export function formatTimeRemaining(ms: number): string {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
  return `${days}d ${hours}h ${minutes}m`;
}

export function useIWOData(chain: 'solana' | 'sui' = 'solana') {
  const [bids, setBids] = useState<Bid[]>([]);
  const [allocatedTokens, setAllocatedTokens] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      await initializeMultiChainConnection(chain);
      const allocated = await fetchAllocatedTokens();
      setAllocatedTokens(allocated);

      // Fetch bids from your IWO program
      // This is a placeholder. You'd need to implement this based on your program's structure
      const fetchedBids: Bid[] = await program.account.bid.all();
      setBids(fetchedBids);

      const weight = fetchedBids.reduce((sum, bid) => sum + bid.weight, 0);
      setTotalWeight(weight);
    };

    fetchData();

    const interval = setInterval(() => {
      setTimeRemaining(Math.max(0, iwoEndTime.getTime() - Date.now()));
    }, 1000);

    return () => clearInterval(interval);
  }, [chain]);

  const submitBid = async (amount: number, vestingPeriod: number, walletAddress: string) => {
    const signature = await submitBidToBlockchain(amount, vestingPeriod, walletAddress);
    const weight = calculateBidWeight(amount, vestingPeriod);
    const newBid: Bid = {
      id: signature,
      userId: walletAddress,
      amount,
      vestingPeriod,
      weight,
      transactionSignature: signature,
      timestamp: new Date().toISOString(),
    };
    setBids([...bids, newBid]);
    setAllocatedTokens(allocatedTokens + amount);
    setTotalWeight(totalWeight + weight);
  };

  return { bids, allocatedTokens, timeRemaining, totalWeight, submitBid };
}

export const iwoEndTime = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now

