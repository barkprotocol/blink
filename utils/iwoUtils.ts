import { useState, useEffect } from 'react';
import { Connection, PublicKey, clusterApiUrl, Transaction, SystemProgram, sendAndConfirmTransaction, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Program, AnchorProvider, web3 as anchorWeb3, Idl, BN } from '@coral-xyz/anchor';
import idl from '@/lib/programs/iwo_program_idl.json';
console.log('IDL:', idl);

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

const BARK_TOKEN_MINT_ADDRESS = new PublicKey(process.env.NEXT_PUBLIC_TOKEN_PROGRAM_ID || '2NTvEssJ2i998V2cMGT4Fy3JhyFnAzHFonDo9dbAkVrg');
const IWO_POOL_ID = new PublicKey(process.env.NEXT_PUBLIC_IWO_CONTRACT_ADDRESS || 'BARKkeAwhTuFzcLHX4DjotRsmjXQ1MshGrZbn1CUQqMo');
const VESTING_PROGRAM_ID = new PublicKey('GKb2vF9RE1UPhV6hQi7yiL5tCsdajbJHyTm87zhN3qiU');

let connection: Connection;
let program: Program;

export async function initializeSolanaConnection() {
  connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl('devnet'), 'confirmed');
  if (typeof window !== 'undefined' && (window as any).solana) {
    try {
      const provider = new AnchorProvider(
        connection, 
        (window as any).solana, 
        { preflightCommitment: 'confirmed' }
      );
      console.log('Provider:', provider);
      console.log('IWO_POOL_ID:', IWO_POOL_ID.toBase58());

      if (!idl) {
        throw new Error('IDL is undefined. Make sure the IDL file is properly imported.');
      }

      if (!IWO_POOL_ID) {
        throw new Error('IWO_POOL_ID is undefined. Check your environment variables.');
      }

      program = new Program(idl as unknown as Idl, IWO_POOL_ID, provider);
      
      if (!program) {
        throw new Error('Failed to initialize program. Check your IDL and IWO_POOL_ID.');
      }

      console.log('Program initialized successfully');
    } catch (error) {
      console.error('Error initializing program:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to initialize Solana connection: ${error.message}`);
      } else {
        throw new Error('Failed to initialize Solana connection: Unknown error');
      }
    }
  } else {
    throw new Error('Solana object not found! Make sure you have a Solana wallet installed.');
  }
}

export async function initializeMultiChainConnection(chain: 'solana' | 'sui') {
  if (chain === 'solana') {
    await initializeSolanaConnection();
  } else if (chain === 'sui') {
    console.log('SUI connection not yet implemented');
  }
}

export async function fetchBARKTokenSupply(): Promise<number> {
  if (!connection) await initializeSolanaConnection();
  const tokenSupply = await connection.getTokenSupply(BARK_TOKEN_MINT_ADDRESS);
  return tokenSupply.value.uiAmount || 0;
}

export async function fetchAllocatedTokens(): Promise<number> {
  if (!connection) await initializeSolanaConnection();
  const iwoAccount = await connection.getAccountInfo(IWO_POOL_ID);
  if (!iwoAccount) {
    console.error('IWO account not found');
    return 0;
  }
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
  if (!connection || !program) await initializeSolanaConnection();
  
  if (!program) {
    throw new Error('Program not initialized');
  }

  const fromPubkey = new PublicKey(walletAddress);
  const transaction = new Transaction().add(
    await program.methods.submitBid(new BN(amount), vestingPeriod)
      .accounts({
        user: fromPubkey,
        iwoPool: IWO_POOL_ID,
        systemProgram: SystemProgram.programId,
      })
      .instruction()
  );

  try {
    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [(window as any).solana.wallet.adapter]
    );
    return signature;
  } catch (error) {
    console.error('Error submitting bid to blockchain:', error);
    throw error;
  }
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  }).format(num);
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
    let isMounted = true;
    const fetchData = async () => {
      try {
        await initializeMultiChainConnection(chain);
        const allocated = await fetchAllocatedTokens();
        if (isMounted) setAllocatedTokens(allocated);

        if (program) {
          // Fetch bids from the program
          const fetchedBids = await program.account.iwoPool.fetch(IWO_POOL_ID);
          if (isMounted && fetchedBids.bids) {
            const formattedBids: Bid[] = fetchedBids.bids.map((bid: any) => ({
              id: bid.publicKey.toBase58(),
              userId: bid.account.bidder.toBase58(),
              amount: bid.account.amount.toNumber(),
              vestingPeriod: bid.account.vestingPeriod,
              weight: bid.account.weight.toNumber(),
              transactionSignature: '', // This information might not be available in the account data
              timestamp: new Date(bid.account.timestamp.toNumber() * 1000).toISOString(),
            }));
            setBids(formattedBids);
            const weight = formattedBids.reduce((sum, bid) => sum + bid.weight, 0);
            setTotalWeight(weight);
          }
        }
      } catch (error) {
        console.error('Error fetching IWO data:', error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      if (isMounted) setTimeRemaining(Math.max(0, iwoEndTime.getTime() - Date.now()));
    }, 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [chain]);

  const submitBid = async (amount: number, vestingPeriod: number, walletAddress: string) => {
    try {
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
      return signature;
    } catch (error) {
      console.error('Error submitting bid:', error);
      throw error;
    }
  };

  return { bids, allocatedTokens, timeRemaining, totalWeight, submitBid };
}

export const iwoEndTime = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now

