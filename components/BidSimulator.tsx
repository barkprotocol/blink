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
    <Card className="border-2 shadow-lg" style={{borderColor: colors.accent, backgroundColor: colors.primary}}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold" style={{color: colors.secondary}}>BARK Token Bid Simulator</CardTitle>
        <CardDescription className="text-sm" style={{color: colors.darkGray}}>Optimize your bid strategy with our interactive simulator</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-semibold mb-1" style={{color: colors.darkGray}}>Bid Amount:</p>
            <p className="text-lg font-bold" style={{color: colors.secondary}}>{formatNumber(bidAmount)} BARK</p>
          </div>
          <div>
            <p className="text-sm font-semibold mb-1" style={{color: colors.darkGray}}>Vesting Period:</p>
            <p className="text-lg font-bold" style={{color: colors.secondary}}>{vestingPeriod} months</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold mb-1" style={{color: colors.darkGray}}>Calculated Bid Weight:</p>
          <p className="text-2xl font-bold" style={{color: colors.accent}}>{formatNumber(bidWeight)}</p>
        </div>
        <div className="bg-opacity-10 p-3 rounded-md" style={{backgroundColor: colors.accent}}>
          <p className="text-sm" style={{color: colors.secondary}}>
            <span className="font-semibold">Pro Tip:</span> A higher bid weight increases your chances of token allocation. 
            Consider increasing your vesting period to boost your bid weight.
          </p>
        </div>
        <p className="text-xs italic" style={{color: colors.darkGray}}>
          Note: Bid weight is calculated as (Bid Amount) * (1 + Vesting Period / 12)
        </p>
      </CardContent>
    </Card>
  )
}

