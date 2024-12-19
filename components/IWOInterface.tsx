"use client"

import { useState, useEffect } from 'react'
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useIWOData, CIRCULATING_SUPPLY, MAX_SUPPLY, LOCKED_SUPPLY, calculateBidWeight, formatNumber, formatTimeRemaining, submitBidToBlockchain } from '../utils/iwoUtils'
import { BidSimulator } from './BidSimulator'
import { Leaderboard } from './Leaderboard'
import { AdvancedAnalytics } from './AdvancedAnalytics'
import { TokenAllocationChart } from './TokenAllocationChart'
import { BARKTokenIWOAnalytics } from './BARKTokenIWOAnalytics'
import { BARKTokenPriceChart } from './BARKTokenPriceChart'
import { GovernanceAnalytics } from './GovernanceAnalytics'
import { colors } from '../lib/colors'
import Link from 'next/link'
import { Settings } from 'lucide-react'

export function IWOInterface() {
  const { bids, allocatedTokens, timeRemaining, totalWeight, submitBid } = useIWOData()
  const [bidAmount, setBidAmount] = useState(0)
  const [vestingPeriod, setVestingPeriod] = useState(6)
  const [walletAddress, setWalletAddress] = useState('')
  const { toast } = useToast()

  const handleSubmitBid = async () => {
    if (bidAmount > 0 && vestingPeriod > 0 && walletAddress) {
      try {
        const signature = await submitBidToBlockchain(bidAmount, vestingPeriod, walletAddress);
        await submitBid(bidAmount, vestingPeriod, walletAddress);
        toast({
          title: "Bid Submitted",
          description: `Your bid of ${formatNumber(bidAmount)} BARK tokens with a ${vestingPeriod} month vesting period has been submitted. Transaction signature: ${signature}`,
        })
        setBidAmount(0)
        setVestingPeriod(6)
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred while submitting your bid. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  useEffect(() => {
    if (allocatedTokens > CIRCULATING_SUPPLY * 0.9) {
      toast({
        title: "IWO Almost Complete",
        description: "90% of available tokens have been allocated. Submit your bid soon!",
        duration: 10000,
      })
    }
  }, [allocatedTokens, toast])

  return (
    <div className="container mx-auto p-4 space-y-8 max-w-8xl" style={{backgroundColor: colors.lightGray}}>
      <Card className="border-2" style={{borderColor: colors.accent, backgroundColor: colors.primary}}>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold" style={{color: colors.secondary}}>BARK Token Initial Weight Offering (IWO)</CardTitle>
            <CardDescription style={{color: colors.darkGray}}>Participate in the BARK token sale and track your bid in real-time</CardDescription>
          </div>
          <Link href="/settings">
            <Button variant="outline" className="flex items-center gap-2 hover:bg-accent hover:text-primary" style={{
              borderColor: colors.accent,
              color: colors.secondary,
              transition: 'all 0.3s ease',
            }}>
              <Settings size={18} />
              Settings
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-2">
            <Label htmlFor="walletAddress" style={{color: colors.secondary}}>Solana Wallet Address</Label>
            <Input
              id="walletAddress"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="Enter your Solana wallet address"
              className="border-2"
              style={{borderColor: colors.secondary, backgroundColor: colors.lightGray, color: colors.secondary}}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bidAmount" style={{color: colors.secondary}}>Bid Amount (BARK tokens)</Label>
            <Input
              id="bidAmount"
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(Number(e.target.value))}
              placeholder="Enter bid amount"
              className="border-2"
              style={{borderColor: colors.secondary, backgroundColor: colors.lightGray, color: colors.secondary}}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vestingPeriod" style={{color: colors.secondary}}>Vesting Period (months)</Label>
            <Input
              id="vestingPeriod"
              type="number"
              value={vestingPeriod}
              onChange={(e) => setVestingPeriod(Number(e.target.value))}
              placeholder="Enter vesting period"
              className="border-2"
              style={{borderColor: colors.secondary, backgroundColor: colors.lightGray, color: colors.secondary}}
            />
          </div>
          <BidSimulator bidAmount={bidAmount} vestingPeriod={vestingPeriod} />
          <Button onClick={handleSubmitBid} className="w-full py-3 text-lg font-semibold" style={{backgroundColor: colors.accent, color: colors.primary}}>
            Submit Bid
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="w-full">
            <p style={{color: colors.secondary}}>Tokens Allocated: {formatNumber(allocatedTokens)} / {formatNumber(CIRCULATING_SUPPLY)}</p>
            <Progress value={(allocatedTokens / CIRCULATING_SUPPLY) * 100} className="w-full" style={{backgroundColor: colors.darkGray}} />
          </div>
          <div className="flex justify-between w-full">
            <p style={{color: colors.secondary}}>Circulating Supply: {formatNumber(CIRCULATING_SUPPLY)}</p>
            <p style={{color: colors.secondary}}>Max Supply: {formatNumber(MAX_SUPPLY)}</p>
          </div>
          <div className="flex justify-between w-full">
            <p style={{color: colors.secondary}}>Locked Supply: {formatNumber(LOCKED_SUPPLY)}</p>
            <p style={{color: colors.secondary}}>Time Remaining: {formatTimeRemaining(timeRemaining)}</p>
          </div>
        </CardFooter>
      </Card>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <BARKTokenPriceChart />
        <BARKTokenIWOAnalytics bids={bids} />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <TokenAllocationChart bids={bids} totalWeight={totalWeight} />
        <GovernanceAnalytics />
      </div>
      <Leaderboard bids={bids} />
      <AdvancedAnalytics bids={bids} />
    </div>
  )
}

