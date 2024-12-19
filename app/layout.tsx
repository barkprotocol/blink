import './styles/globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import { CustomWalletProvider } from '@/components/ui/wallet-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'BARK Token Initial Weight Offering',
  description: 'Participate in the BARK token sale and track your bid in real-time',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomWalletProvider>
          {children}
          <Toaster />
        </CustomWalletProvider>
      </body>
    </html>
  )
}

