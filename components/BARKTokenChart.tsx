"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { colors } from '../lib/colors'
import { Bid } from '../utils/iwoUtils'

interface ChartData {
  name: string;
  totalBids: number;
  averageBidAmount: number;
  averageVestingPeriod: number;
}

interface BARKTokenChartProps {
  bids: Bid[];
}

function calculateChartData(bids: Bid[]): ChartData[] {
  const sortedBids = [...bids].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  const chartData: ChartData[] = [];

  for (let i = 0; i < sortedBids.length; i += 10) {
    const slice = sortedBids.slice(0, i + 10);
    const totalBids = slice.length;
    const averageBidAmount = slice.reduce((sum, bid) => sum + bid.amount, 0) / totalBids;
    const averageVestingPeriod = slice.reduce((sum, bid) => sum + bid.vestingPeriod, 0) / totalBids;

    chartData.push({
      name: new Date(slice[slice.length - 1].timestamp).toLocaleDateString(),
      totalBids,
      averageBidAmount,
      averageVestingPeriod
    });
  }

  return chartData;
}

export function BARKTokenChart({ bids }: BARKTokenChartProps) {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    setChartData(calculateChartData(bids));
  }, [bids]);

  return (
    <Card className="w-full border-2" style={{borderColor: colors.accent, backgroundColor: colors.primary}}>
      <CardHeader>
        <CardTitle className="text-xl font-bold" style={{color: colors.secondary}}>BARK Token IWO Analytics</CardTitle>
        <CardDescription style={{color: colors.darkGray}}>Bid trends and statistics over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            totalBids: {
              label: "Total Bids",
              color: colors.chartColors[0],
            },
            averageBidAmount: {
              label: "Avg Bid Amount",
              color: colors.chartColors[1],
            },
            averageVestingPeriod: {
              label: "Avg Vesting Period",
              color: colors.chartColors[2],
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="name" stroke={colors.accent} />
              <YAxis yAxisId="left" stroke={colors.accent} />
              <YAxis yAxisId="right" orientation="right" stroke={colors.accent} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="totalBids" stroke={colors.chartColors[0]} activeDot={{ r: 8 }} />
              <Line yAxisId="left" type="monotone" dataKey="averageBidAmount" stroke={colors.chartColors[1]} activeDot={{ r: 8 }} />
              <Line yAxisId="right" type="monotone" dataKey="averageVestingPeriod" stroke={colors.chartColors[2]} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}