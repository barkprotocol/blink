import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { Bid } from '../utils/iwoUtils'

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
    <Card>
      <CardHeader>
        <CardTitle>Advanced Analytics</CardTitle>
        <CardDescription>Bid trends and statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={analyticsData}>
            <XAxis dataKey="timestamp" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="totalBids" stroke="#8884d8" />
            <Line yAxisId="left" type="monotone" dataKey="averageBidAmount" stroke="#82ca9d" />
            <Line yAxisId="right" type="monotone" dataKey="averageVestingPeriod" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

