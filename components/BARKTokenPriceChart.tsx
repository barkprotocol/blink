"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { colors } from '../lib/colors'

interface PriceData {
  date: number;
  price: number;
}

const timeRanges = [
  { label: '1D', days: 1 },
  { label: '1W', days: 7 },
  { label: '1M', days: 30 },
  { label: '3M', days: 90 },
  { label: '1Y', days: 365 },
  { label: 'ALL', days: 'max' }
]

export function BARKTokenPriceChart() {
  const [selectedRange, setSelectedRange] = useState('1W')
  const [priceData, setPriceData] = useState<PriceData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPriceData = async (days: number | string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}`)
      if (!response.ok) {
        throw new Error('Failed to fetch price data')
      }
      const data = await response.json()
      const formattedData: PriceData[] = data.prices.map(([timestamp, price]: [number, number]) => ({
        date: timestamp,
        price: price
      }))
      setPriceData(formattedData)
    } catch (err) {
      setError('Failed to fetch price data. Please try again later.')
      console.error('Error fetching price data:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const range = timeRanges.find(r => r.label === selectedRange)
    if (range) {
      fetchPriceData(range.days)
    }
  }, [selectedRange])

  return (
    <Card className="w-full border-2" style={{borderColor: colors.accent, backgroundColor: colors.primary}}>
      <CardHeader>
        <CardTitle className="text-xl font-bold" style={{color: colors.secondary}}>BARK Token Price</CardTitle>
        <CardDescription style={{color: colors.darkGray}}>Historical price data for BARK token</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {timeRanges.map(({ label }) => (
            <Button
              key={label}
              variant={selectedRange === label ? "default" : "outline"}
              onClick={() => setSelectedRange(label)}
              style={{
                backgroundColor: selectedRange === label ? colors.accent : 'transparent',
                color: selectedRange === label ? colors.secondary : colors.darkGray,
                borderColor: colors.accent
              }}
            >
              {label}
            </Button>
          ))}
        </div>
        <div className="h-[400px]">
          <ChartContainer
            config={{
              price: {
                label: "Price (USD)",
                color: colors.accent,
              },
            }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <p style={{color: colors.secondary}}>Loading...</p>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-full">
                <p style={{color: colors.secondary}}>{error}</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <XAxis 
                    dataKey="date" 
                    stroke={colors.darkGray}
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis 
                    stroke={colors.darkGray}
                    tickFormatter={(value) => `$${value.toFixed(2)}`}
                  />
                  <ChartTooltip 
                    content={
                      <ChartTooltipContent 
                        formatValue={(value, dataKey) => {
                          if (dataKey === 'price') return `$${Number(value).toFixed(2)}`;
                          return `${value}`;
                        }}
                      />
                    }
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    name="Price (USD)"
                    stroke={colors.accent} 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

