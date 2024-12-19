import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { calculateBidWeight, formatNumber } from '../utils/iwoUtils'
import { colors } from '../lib/colors'

interface BidSimulatorProps {
  bidAmount: number
  vestingPeriod: number
}

export function BidSimulator({ bidAmount, vestingPeriod }: BidSimulatorProps) {
  const bidWeight = calculateBidWeight(bidAmount, vestingPeriod)

  return (
    <Card className="border-2" style={{borderColor: colors.accent, backgroundColor: colors.primary}}>
      <CardHeader>
        <CardTitle className="text-lg font-bold" style={{color: colors.secondary}}>BARK Token Bid Simulator</CardTitle>
        <CardDescription style={{color: colors.darkGray}}>See how your bid parameters affect your bid weight</CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{color: colors.secondary}}>Bid Amount: {formatNumber(bidAmount)} BARK tokens</p>
        <p style={{color: colors.secondary}}>Vesting Period: {vestingPeriod} months</p>
        <p style={{color: colors.secondary}}>Calculated Bid Weight: {formatNumber(bidWeight)}</p>
        <p style={{color: colors.darkGray}}>Higher bid weight increases your chances of token allocation</p>
      </CardContent>
    </Card>
  )
}

