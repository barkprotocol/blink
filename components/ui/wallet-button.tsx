"use client"

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Button } from "@/components/ui/button"
import { Wallet } from 'lucide-react'
import { colors } from '@/lib/colors'

export function WalletButton() {
  const { wallet, connect, disconnect, connecting, connected } = useWallet()

  return (
    <div className="dark">
      {!wallet ? (
        <WalletMultiButton
          style={{
            backgroundColor: colors.secondary,
            color: colors.primary,
            borderColor: colors.accent,
            transition: 'all 0.3s ease',
          }}
          className="text-sm py-2 px-2 rounded-md"
        />
      ) : (
        <Button
          className="text-sm py-2 px-2 rounded-md flex items-center gap-2 hover:bg-secondary hover:text-primary"
          style={{
            borderColor: colors.accent,
            color: colors.primary,
            backgroundColor: colors.secondary,
            transition: 'all 0.3s ease',
          }}
          onClick={connected ? disconnect : connect}
        >
          <Wallet size={14} />
          {connecting ? 'Connecting' : connected ? 'Disconnect' : 'Connect'}
        </Button>
      )}
    </div>
  )
}

