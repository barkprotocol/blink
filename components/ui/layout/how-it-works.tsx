"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, Calculator, Clock, BarChartIcon as ChartBar } from 'lucide-react'
import { colors } from '@/lib/colors'

const steps = [
  {
    icon: Wallet,
    title: "Connect Wallet",
    description: "Link your Solana wallet to participate in the IWO."
  },
  {
    icon: Calculator,
    title: "Place Bid",
    description: "Specify your bid amount and vesting period."
  },
  {
    icon: Clock,
    title: "Wait for IWO to End",
    description: "The offering runs for a set period. Monitor progress in real-time."
  },
  {
    icon: ChartBar,
    title: "Receive Allocation",
    description: "Tokens are distributed based on your bid's weight relative to others."
  }
]

export function HowItWorks() {
  return (
    <Card className="w-full border-2 shadow-lg" style={{borderColor: colors.accent, backgroundColor: colors.primary}}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center" style={{color: colors.secondary}}>How It Works</CardTitle>
        <CardDescription className="text-center" style={{color: colors.darkGray}}>Participate in the BARK Token Initial Weight Offering</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 p-3 rounded-full" style={{backgroundColor: `${colors.accent}40`}}>
                <step.icon size={24} style={{color: colors.secondary}} aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{color: colors.secondary}}>{step.title}</h3>
              <p style={{color: colors.darkGray}}>{step.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

