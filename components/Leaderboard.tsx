import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bid, formatNumber } from '../utils/iwoUtils'
import { colors } from '../lib/colors'

interface LeaderboardProps {
  bids: Bid[]
}

export function Leaderboard({ bids }: LeaderboardProps) {
  const sortedBids = [...bids].sort((a, b) => b.weight - a.weight).slice(0, 5)

  return (
    <Card className="w-full border-2" style={{borderColor: colors.accent, backgroundColor: colors.primary}}>
      <CardHeader>
        <CardTitle className="text-xl font-bold" style={{color: colors.secondary}}>BARK Token Bid Leaderboard</CardTitle>
        <CardDescription style={{color: colors.darkGray}}>Top 5 bids by weight</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead style={{color: colors.secondary}}>Rank</TableHead>
              <TableHead style={{color: colors.secondary}}>Wallet Address</TableHead>
              <TableHead style={{color: colors.secondary}}>Bid Amount (BARK)</TableHead>
              <TableHead style={{color: colors.secondary}}>Vesting Period</TableHead>
              <TableHead style={{color: colors.secondary}}>Bid Weight</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedBids.map((bid, index) => (
              <TableRow key={bid.id}>
                <TableCell style={{color: colors.secondary}}>{index + 1}</TableCell>
                <TableCell style={{color: colors.secondary}}>{bid.userId.slice(0, 6)}...{bid.userId.slice(-4)}</TableCell>
                <TableCell style={{color: colors.secondary}}>{formatNumber(bid.amount)}</TableCell>
                <TableCell style={{color: colors.secondary}}>{bid.vestingPeriod} months</TableCell>
                <TableCell style={{color: colors.secondary}}>{formatNumber(bid.weight)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

