"use client"

import { useState, useCallback, useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Button } from "@/components/ui/button"
import { Wallet } from 'lucide-react'
import { colors } from '@/lib/colors'
import { useToast } from "@/components/ui/use-toast"

export function WalletButton() {
  const { wallet, connect, disconnect, connecting, connected, publicKey } = useWallet()
  const [isConnecting, setIsConnecting] = useState(false)
  const { toast } = useToast()

  const handleConnect = useCallback(async () => {
    setIsConnecting(true)
    try {
      await connect()
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      
      if (error instanceof Error && error.message.includes("Unexpected error")) {
        toast({
          title: "Connection Issue",
          description: "There was an issue connecting to your wallet. Please try disconnecting and reconnecting your wallet extension, or use an alternative wallet.",
          variant: "destructive",
          duration: 10000,
        })
        
        // Attempt to use a fallback connection method
        try {
          const provider = (window as any).solana;
          if (provider && provider.connect) {
            await provider.connect();
            toast({
              title: "Connected",
              description: "Successfully connected using fallback method.",
            })
          }
        } catch (fallbackError) {
          console.error('Fallback connection failed:', fallbackError)
          toast({
            title: "Fallback Connection Failed",
            description: "Please try using a different wallet or refreshing the page.",
            variant: "destructive",
          })
        }
      } else {
        toast({
          title: "Connection Error",
          description: "Failed to connect wallet. Please try again.",
          variant: "destructive",
        })
      }
    } finally {
      setIsConnecting(false)
    }
  }, [connect, toast])

  const handleDisconnect = useCallback(async () => {
    try {
      await disconnect()
    } catch (error) {
      console.error('Failed to disconnect wallet:', error)
      toast({
        title: "Disconnection Error",
        description: "Failed to disconnect wallet. Please try again.",
        variant: "destructive",
      })
    }
  }, [disconnect, toast])

  useEffect(() => {
    if (connected && publicKey) {
      toast({
        title: "Wallet Connected",
        description: `Connected to ${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`,
      })
    }
  }, [connected, publicKey, toast])

  return (
    <div className="dark">
      {!wallet ? (
        <WalletMultiButton
          style={{
            backgroundColor: colors.secondary,
            color: colors.primary,
            borderColor: colors.accent,
            transition: 'all 0.3s ease',
            padding: '0.5rem 1rem',
            fontSize: '0.875rem',
          }}
          className="text-sm py-2 px-4 rounded-md"
        />
      ) : (
        <Button
          className="text-sm py-2 px-4 rounded-md flex items-center gap-2 hover:bg-secondary hover:text-primary"
          style={{
            borderColor: colors.accent,
            color: colors.primary,
            backgroundColor: colors.secondary,
            transition: 'all 0.3s ease',
          }}
          onClick={connected ? handleDisconnect : handleConnect}
          disabled={isConnecting}
        >
          <Wallet size={16} />
          {isConnecting ? 'Connecting...' : connecting ? 'Connecting' : connected ? 'Disconnect' : 'Connect'}
        </Button>
      )}
    </div>
  )
}

