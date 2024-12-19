"use client"

import { useState, useEffect } from 'react'
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useIWOData, CIRCULATING_SUPPLY, MAX_SUPPLY, LOCKED_SUPPLY, calculateBidWeight, formatNumber, formatTimeRemaining, submitBidToBlockchain } from '../utils/iwoUtils'
import { BidSimulator } from './BidSimulator'
import { Leaderboard } from './Leaderboard'
import { AdvancedAnalytics } from './AdvancedAnalytics'
import { TwoFactorAuth } from './TwoFactorAuth'
import { BARKTokenChart } from './BARKTokenChart'
import { TokenAllocationChart } from './TokenAllocationChart'
import { colors } from '../lib/colors'

export function IWOInterface() {
  const { bids, allocatedTokens, timeRemaining, totalWeight, submitBid } = useIWOData()
  const [bidAmount, setBidAmount] = useState(0)
  const [vestingPeriod, setVestingPeriod] = useState(6)
  const [walletAddress, setWalletAddress] = useState('')
  const [is2FAVerified, setIs2FAVerified] = useState(false)
  const { toast } = useToast()

  const handleSubmitBid = async () => {
    if (bidAmount > 0 && vestingPeriod > 0 && walletAddress && is2FAVerified) {
      try {
        const signature = await submitBidToBlockchain(bidAmount, vestingPeriod, walletAddress);
        await submitBid(bidAmount, vestingPeriod, walletAddress);
        toast({
          title: "Bid Submitted",
          description: `Your bid of ${formatNumber(bidAmount)} BARK tokens with a ${vestingPeriod} month vesting period has been submitted. Transaction signature: ${signature}`,
        })
        setBidAmount(0)
        setVestingPeriod(6)
        setIs2FAVerified(false)
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred while submitting your bid. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const handle2FAVerify = async (code: string) => {
    // In a real application, you would verify the 2FA code with your backend
    // This is a mock implementation
    const isValid = code === '123456';
    setIs2FAVerified(isValid);
    return isValid;
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
    <div className="container mx-auto p-4 space-y-8" style={{backgroundColor: colors.lightGray}}>
      <Card className="border-2" style={{borderColor: colors.accent, backgroundColor: colors.primary}}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold" style={{color: colors.secondary}}>BARK Token Initial Weight Offering (IWO)</CardTitle>
          <CardDescription style={{color: colors.darkGray}}>Participate in the BARK token sale and track your bid in real-time</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
          {!is2FAVerified && <TwoFactorAuth onVerify={handle2FAVerify} />}
          <Button onClick={handleSubmitBid} disabled={!is2FAVerified} className="w-full" style={{backgroundColor: colors.accent, color: colors.secondary}}>
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
      <BARKTokenChart bids={bids} />
      <TokenAllocationChart bids={bids} totalWeight={totalWeight} />
      <Leaderboard bids={bids} />
      <AdvancedAnalytics bids={bids} />
    </div>
  )
}

