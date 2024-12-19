"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { colors } from '@/lib/colors'

interface GovernanceData {
  proposal: string;
  votes: number;
  participation: number;
}

const mockData: GovernanceData[] = [
  { proposal: "Proposal 1", votes: 1500, participation: 75 },
  { proposal: "Proposal 2", votes: 2200, participation: 85 },
  { proposal: "Proposal 3", votes: 1800, participation: 70 },
  { proposal: "Proposal 4", votes: 2500, participation: 90 },
  { proposal: "Proposal 5", votes: 2000, participation: 80 },
]

export function GovernanceAnalytics() {
  const [data] = useState<GovernanceData[]>(mockData)

  return (
    <Card className="w-full border-2 shadow-lg overflow-hidden" style={{
      borderColor: colors.accent,
      backgroundColor: colors.primary,
      boxShadow: `0 4px 6px -1px ${colors.accent}40, 0 2px 4px -2px ${colors.accent}30`
    }}>
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold" style={{color: colors.secondary}}>Governance Analytics</CardTitle>
        <CardDescription className="text-lg" style={{color: colors.darkGray}}>Recent proposal votes and participation rates</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-5 gap-4 mb-4">
          {[
            { value: 25, label: "Proposals" },
            { value: 50, label: "Voters" },
            { value: 75, label: "Participation %" },
            { value: 10, label: "Days Left" },
            { value: 0, label: "Rejected" }
          ].map(({ value, label }, index) => (
            <div key={index} className="text-center p-2 rounded-lg" style={{backgroundColor: `${colors.accent}20`, border: `1px solid ${colors.accent}`}}>
              <span className="text-2xl font-bold" style={{color: colors.secondary}}>{value}</span>
              <p className="text-sm mt-1" style={{color: colors.darkGray}}>{label}</p>
            </div>
          ))}
        </div>
        <div className="border-2 rounded-lg p-4" style={{borderColor: colors.accent}}>
          <ChartContainer
            config={{
              votes: {
                label: "Votes",
                color: colors.chartColors[0],
                valueFormatter: (value: number) => `${value.toLocaleString()} votes`,
              },
              participation: {
                label: "Participation",
                color: colors.chartColors[1],
                valueFormatter: (value: number) => `${value}%`,
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%" aria-label="Governance analytics chart showing votes and participation rates for recent proposals">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <XAxis 
                  dataKey="proposal" 
                  stroke={colors.darkGray} 
                  tick={{fill: colors.secondary, fontSize: 12}} 
                  tickLine={{stroke: colors.accent}}
                />
                <YAxis 
                  yAxisId="left" 
                  stroke={colors.darkGray} 
                  tick={{fill: colors.secondary, fontSize: 12}} 
                  tickLine={{stroke: colors.accent}}
                  label={{ value: 'Votes', angle: -90, position: 'insideLeft', fill: colors.secondary, fontSize: 14 }}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  stroke={colors.darkGray} 
                  tick={{fill: colors.secondary, fontSize: 12}}
                  tickLine={{stroke: colors.accent}}
                  label={{ value: 'Participation (%)', angle: 90, position: 'insideRight', fill: colors.secondary, fontSize: 14 }}
                />
                <ChartTooltip 
                  cursor={{fill: `${colors.accent}20`}}
                  content={
                    <ChartTooltipContent 
                      styles={{
                        root: { backgroundColor: colors.primary, border: `1px solid ${colors.accent}`, borderRadius: '4px', padding: '8px' },
                        label: { color: colors.secondary, fontWeight: 'bold' },
                        value: { color: colors.darkGray }
                      }}
                    />
                  }
                />
                <Legend 
                  wrapperStyle={{paddingTop: '20px'}} 
                  formatter={(value, entry, index) => <span style={{color: colors.secondary, fontSize: '14px'}}>{value}</span>}
                />
                <Bar 
                  yAxisId="left" 
                  dataKey="votes" 
                  fill={colors.chartColors[0]} 
                  radius={[4, 4, 0, 0]} 
                  maxBarSize={50}
                />
                <Bar 
                  yAxisId="right" 
                  dataKey="participation" 
                  fill={colors.chartColors[1]} 
                  radius={[4, 4, 0, 0]} 
                  maxBarSize={50}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}