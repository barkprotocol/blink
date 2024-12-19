"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
import { colors } from '../lib/colors'
import { Bid, calculateTokenAllocation, CIRCULATING_SUPPLY } from '../utils/iwoUtils'

interface TokenAllocationChartProps {
  bids: Bid[];
  totalWeight: number;
}

export function TokenAllocationChart({ bids, totalWeight }: TokenAllocationChartProps) {
  const availableTokens = CIRCULATING_SUPPLY;

  const data = bids.map(bid => ({
    name: bid.userId.slice(0, 6) + '...' + bid.userId.slice(-4),
    value: calculateTokenAllocation(bid, totalWeight, availableTokens)
  }));

  return (
    <Card className="w-full border-2" style={{borderColor: colors.accent, backgroundColor: colors.primary}}>
      <CardHeader>
        <CardTitle className="text-xl font-bold" style={{color: colors.secondary}}>Token Allocation</CardTitle>
        <CardDescription style={{color: colors.darkGray}}>Distribution of BARK tokens based on bids</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            name: {
              label: "Wallet",
              color: colors.secondary,
            },
            value: {
              label: "Tokens",
              color: colors.darkGray,
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors.chartColors[index % colors.chartColors.length]} />
                ))}
              </Pie>
              <Legend />
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

