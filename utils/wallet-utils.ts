import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js'

export const getNetworkConnection = (network: WalletAdapterNetwork = WalletAdapterNetwork.Devnet) => {
  const endpoint = clusterApiUrl(network)
  return new Connection(endpoint, 'confirmed')
}

export const shortenAddress = (address: string, chars = 4): string => {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`
}

export const isValidSolanaAddress = (address: string): boolean => {
  try {
    new PublicKey(address)
    return true
  } catch {
    return false
  }
}

export const getExplorerUrl = (address: string, network: WalletAdapterNetwork = WalletAdapterNetwork.Devnet): string => {
  const baseUrl = network === WalletAdapterNetwork.Mainnet
    ? 'https://explorer.solana.com'
    : 'https://explorer.solana.com/?cluster=devnet'
  return `${baseUrl}/address/${address}`
}


