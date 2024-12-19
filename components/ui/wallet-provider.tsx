"use client"

import { FC, ReactNode, useMemo, useCallback } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js'
import { useToast } from "@/components/ui/use-toast"

require('@solana/wallet-adapter-react-ui/styles.css')

interface Props {
  children: ReactNode
}

export const CustomWalletProvider: FC<Props> = ({ children }) => {
  const { toast } = useToast()
  const network = WalletAdapterNetwork.Devnet
  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    [network]
  )

  const onError = useCallback((error: Error) => {
    console.error(error)
    if (error.message.includes("Unexpected error")) {
      toast({
        title: "Wallet Connection Issue",
        description: "There was an unexpected error connecting to your wallet. Please try refreshing the page or using a different wallet.",
        variant: "destructive",
        duration: 10000,
      })
    } else {
      toast({
        title: "Wallet Error",
        description: `${error.name}: ${error.message}`,
        variant: "destructive",
      })
    }
  }, [toast])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect={false}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

