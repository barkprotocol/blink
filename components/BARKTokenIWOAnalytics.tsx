"use client"

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, Legend, ResponsiveContainer } from 'recharts'
import { colors } from '@/lib/colors'
import { Bid } from '@/utils/iwoUtils'

interface ChartData {
  timestamp: string;
  totalBids: number;
  averageBidAmount: number;
  averageVestingPeriod: number;
}

interface BARKTokenIWOAnalyticsProps {
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
      timestamp: new Date(slice[slice.length - 1].timestamp).toLocaleString(),
      totalBids,
      averageBidAmount,
      averageVestingPeriod
    });
  }

  return chartData;
}

export function BARKTokenIWOAnalytics({ bids }: BARKTokenIWOAnalyticsProps) {
  const [activeDataKey, setActiveDataKey] = useState<string | null>(null);

  const chartData = useMemo(() => calculateChartData(bids), [bids]);

  const handleMouseEnter = (dataKey: string) => {
    setActiveDataKey(dataKey);
  };

  const handleMouseLeave = () => {
    setActiveDataKey(null);
  };

  const formatValue = (value: number, dataKey: string): string => {
    if (dataKey === 'totalBids') return `${value.toFixed(0)} bids`;
    if (dataKey === 'averageBidAmount') return `${value.toFixed(2)} BARK`;
    if (dataKey === 'averageVestingPeriod') return `${value.toFixed(1)} months`;
    return value.toString();
  };

  return (
    <Card className="w-full border-2" style={{borderColor: colors.accent, backgroundColor: colors.primary}}>
      <CardHeader>
        <CardTitle className="text-xl font-bold" style={{color: colors.secondary}}>BARK Token IWO Analytics</CardTitle>
        <CardDescription style={{color: colors.darkGray}}>Bid trends and statistics over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
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
          >
            <ResponsiveContainer width="100%" height="100%" aria-label="BARK Token IWO Analytics Chart">
              <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis 
                  dataKey="timestamp" 
                  stroke={colors.darkGray}
                  tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                />
                <YAxis 
                  yAxisId="left" 
                  stroke={colors.darkGray}
                  tickFormatter={(value) => `${value.toFixed(0)}`}
                  label={{ value: 'Total Bids / Avg Amount', angle: -90, position: 'insideLeft' }}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  stroke={colors.darkGray}
                  tickFormatter={(value) => `${value.toFixed(1)} mo`}
                  label={{ value: 'Avg Vesting Period (months)', angle: 90, position: 'insideRight' }}
                />
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as ChartData;
                      return (
                        <div className="bg-white p-2 border border-gray-200 rounded shadow">
                          <p className="text-sm font-bold">{new Date(data.timestamp).toLocaleDateString()}</p>
                          {payload.map((entry, index) => (
                            <p key={index} className="text-sm" style={{ color: entry.color }}>
                              {`${entry.name}: ${formatValue(entry.value as number, entry.dataKey as string)}`}
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  onMouseEnter={(e) => handleMouseEnter(e.dataKey as string)}
                  onMouseLeave={handleMouseLeave}
                  wrapperStyle={{ cursor: 'pointer' }}
                />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="totalBids" 
                  stroke={colors.chartColors[0]} 
                  strokeWidth={2} 
                  activeDot={{ r: 8 }} 
                  strokeOpacity={activeDataKey && activeDataKey !== 'totalBids' ? 0.3 : 1}
                />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="averageBidAmount" 
                  stroke={colors.chartColors[1]} 
                  strokeWidth={2} 
                  activeDot={{ r: 8 }} 
                  strokeOpacity={activeDataKey && activeDataKey !== 'averageBidAmount' ? 0.3 : 1}
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="averageVestingPeriod" 
                  stroke={colors.chartColors[2]} 
                  strokeWidth={2} 
                  activeDot={{ r: 8 }} 
                  strokeOpacity={activeDataKey && activeDataKey !== 'averageVestingPeriod' ? 0.3 : 1}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}