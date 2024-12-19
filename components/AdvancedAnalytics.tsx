"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { Bid } from '../utils/iwoUtils'
import { colors } from '../lib/colors'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface AnalyticsData {
  timestamp: number;
  totalBids: number;
  averageBidAmount: number;
  averageVestingPeriod: number;
}

interface AdvancedAnalyticsProps {
  bids: Bid[];
}

export function AdvancedAnalytics({ bids }: AdvancedAnalyticsProps) {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);

  useEffect(() => {
    // Generate analytics data
    const data: AnalyticsData[] = [];
    for (let i = 0; i < bids.length; i += 10) {
      const slice = bids.slice(0, i + 10);
      const totalBids = slice.length;
      const averageBidAmount = slice.reduce((sum, bid) => sum + bid.amount, 0) / totalBids;
      const averageVestingPeriod = slice.reduce((sum, bid) => sum + bid.vestingPeriod, 0) / totalBids;
      data.push({
        timestamp: i,
        totalBids,
        averageBidAmount,
        averageVestingPeriod,
      });
    }
    setAnalyticsData(data);
  }, [bids]);

  return (
    <Card className="w-full border-2 shadow-lg" style={{borderColor: colors.accent, backgroundColor: colors.primary}}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold mb-2" style={{color: colors.secondary}}>Advanced Analytics</CardTitle>
        <CardDescription className="text-lg" style={{color: colors.darkGray}}>Comprehensive bid trends and statistics over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 rounded-lg text-center" style={{backgroundColor: `${colors.accent}20`}}>
          <h3 className="text-xl font-semibold mb-3" style={{color: colors.secondary}}>Key Metrics</h3>
          <div className="flex justify-center space-x-8">
            <div>
              <p className="text-sm font-medium mb-1" style={{color: colors.darkGray}}>Total Bids</p>
              <p className="text-2xl font-bold" style={{color: colors.secondary}}>{bids.length}</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-1" style={{color: colors.darkGray}}>Average Bid Amount</p>
              <p className="text-2xl font-bold" style={{color: colors.secondary}}>
                {(bids.reduce((sum, bid) => sum + bid.amount, 0) / bids.length).toFixed(2)} BARK
              </p>
            </div>
            <div>
              <p className="text-sm font-medium mb-1" style={{color: colors.darkGray}}>Average Vesting Period</p>
              <p className="text-2xl font-bold" style={{color: colors.secondary}}>
                {(bids.reduce((sum, bid) => sum + bid.vestingPeriod, 0) / bids.length).toFixed(2)} months
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <ChartContainer
            config={{
              totalBids: {
                label: "Total Bids",
                color: "#dcd7cc",
              },
              averageBidAmount: {
                label: "Avg Bid Amount (BARK)",
                color: "#d0c8b9",
              },
              averageVestingPeriod: {
                label: "Avg Vesting Period (months)",
                color: "#afa088",
              },
            }}
            className="h-[400px] w-full max-w-4xl"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={analyticsData} 
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <XAxis 
                  dataKey="timestamp" 
                  stroke={colors.darkGray}
                  label={{ value: 'Time', position: 'insideBottom', offset: -10, fill: colors.secondary }}
                />
                <YAxis 
                  yAxisId="left" 
                  stroke={colors.darkGray}
                  label={{ value: 'Bids / Amount', angle: -90, position: 'insideLeft', offset: 10, fill: colors.secondary }}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  stroke={colors.darkGray}
                  label={{ value: 'Vesting Period', angle: 90, position: 'insideRight', offset: 10, fill: colors.secondary }}
                />
                <ChartTooltip 
                  content={
                    <ChartTooltipContent 
                      formatValue={(value: number, dataKey: string) => {
                        if (dataKey === 'totalBids') return value.toFixed(0);
                        if (dataKey === 'averageBidAmount') return `${value.toFixed(2)} BARK`;
                        if (dataKey === 'averageVestingPeriod') return `${value.toFixed(2)} months`;
                        return value;
                      }}
                    />
                  }
                />
                <Legend verticalAlign="top" height={36} />
                <Line yAxisId="left" type="monotone" dataKey="totalBids" stroke="#dcd7cc" strokeWidth={3} dot={false} activeDot={{ r: 8 }} />
                <Line yAxisId="left" type="monotone" dataKey="averageBidAmount" stroke="#d0c8b9" strokeWidth={3} dot={false} activeDot={{ r: 8 }} />
                <Line yAxisId="right" type="monotone" dataKey="averageVestingPeriod" stroke="#afa088" strokeWidth={3} dot={false} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

