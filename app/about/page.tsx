"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { colors } from '@/lib/colors'
import { ArrowUpRight, BarChart2, Shield, Users, Zap, Target, Rocket, LineChartIcon as ChartLine, Award } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-4xl font-bold mb-6 text-center" style={{color: colors.secondary}}>About BARK Strategy</h1>
      
      <Card className="mb-8 shadow-lg" style={{backgroundColor: colors.primary, borderColor: colors.accent}}>
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center gap-2" style={{color: colors.secondary}}>
            <ArrowUpRight size={28} />
            Strategic Plan for BARK Token Price Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2" style={{color: colors.secondary}}>
              <BarChart2 size={24} />
              Problem Statement
            </h3>
            <p className="mb-4" style={{color: colors.darkGray}}>
              Token price performance is pivotal for the BARK ecosystem's success, affecting market sentiment, VC interest, builder participation, and network effects. However, traditional Token Generation Event (TGE) models often fail to sustain long-term growth, leading to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2" style={{color: colors.darkGray}}>
              <li><strong>High Token Inflation</strong>: Early investors dump tokens, creating downward price pressure.</li>
              <li><strong>Fear, Uncertainty, and Doubt (FUD)</strong>: Low token prices erode community trust.</li>
              <li><strong>Exit Liquidity Issues</strong>: Communities are exploited by short-term speculators.</li>
              <li><strong>Missed Opportunities</strong>: A declining token price deters builders, investors, and partners.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2" style={{color: colors.secondary}}>
              <Target size={24} />
              Strategic Goals
            </h3>
            <p className="mb-4" style={{color: colors.darkGray}}>To ensure sustainable growth and robust token price performance, we aim to:</p>
            <ol className="list-decimal pl-6 mb-4 space-y-2" style={{color: colors.darkGray}}>
              <li><strong>Minimize Token Inflation</strong>: Protect token value by preventing excessive early selling.</li>
              <li><strong>Incentivize Long-Term Commitment</strong>: Attract long-term investors and discourage short-term speculation.</li>
              <li><strong>Build Community Trust</strong>: Foster a strong and engaged community with aligned interests.</li>
              <li><strong>Enhance Organic Growth</strong>: Trigger network effects through positive market sentiment and user engagement.</li>
              <li><strong>Ensure Scalability</strong>: Design a model that supports the ecosystem's growth trajectory and long-term sustainability.</li>
            </ol>
          </section>
        </CardContent>
      </Card>

      <Card className="mb-8 shadow-lg" style={{backgroundColor: colors.primary, borderColor: colors.accent}}>
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center gap-2" style={{color: colors.secondary}}>
            <Rocket size={28} />
            Proposed Solution: Initial Weight Offering (IWO)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="mb-4" style={{color: colors.darkGray}}>
            The <strong>Initial Weight Offering (IWO)</strong> is an innovative TGE model that uses a <strong>bidding-over-vesting schedule length</strong> system. This model prioritizes long-term investors and discourages short-term speculation.
          </p>

          <section>
            <h4 className="text-xl font-semibold mb-2 flex items-center gap-2" style={{color: colors.secondary}}>
              <Zap size={20} />
              Key Features
            </h4>
            <ol className="list-decimal pl-6 mb-4 space-y-2" style={{color: colors.darkGray}}>
              <li>
                <strong>Vesting Schedule Bidding</strong>:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Participants bid for token allocations based on their willingness to lock tokens for a longer period.</li>
                  <li>Allocations are distributed from the longest vesting schedules to the shortest until the pool is depleted.</li>
                </ul>
              </li>
              <li><strong>Deflationary Effect</strong>: By prioritizing long-term vesting, token inflation is minimized, reducing sell pressure.</li>
              <li><strong>Community Protection</strong>: The IWO model safeguards the community from being used as exit liquidity.</li>
              <li><strong>Trust and Organic Growth</strong>: A rising token price builds trust and attracts more users, investors, and developers.</li>
            </ol>
          </section>

          <section>
            <h4 className="text-xl font-semibold mb-2 flex items-center gap-2" style={{color: colors.secondary}}>
              <Award size={20} />
              Key Benefits
            </h4>
            <ul className="list-disc pl-6 mb-4 space-y-2" style={{color: colors.darkGray}}>
              <li><strong>Stronger Price Performance</strong>: Reduced token inflation leads to stable or increasing token prices.</li>
              <li><strong>Aligned Interests</strong>: Long-term investors benefit from price appreciation, fostering loyalty and trust.</li>
              <li><strong>Exponential Growth</strong>: Network effects from trust and organic engagement amplify project success.</li>
              <li><strong>Sustainable Ecosystem</strong>: The model ensures long-term profitability and community satisfaction.</li>
            </ul>
          </section>
        </CardContent>
      </Card>

      <Card className="mb-8 shadow-lg" style={{backgroundColor: colors.primary, borderColor: colors.accent}}>
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center gap-2" style={{color: colors.secondary}}>
            <ChartLine size={28} />
            Implementation Strategy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h4 className="text-xl font-semibold mb-2 flex items-center gap-2" style={{color: colors.secondary}}>
              <Target size={20} />
              Phase 1: Planning
            </h4>
            <ul className="list-disc pl-6 mb-4 space-y-2" style={{color: colors.darkGray}}>
              <li><strong>Design Tokenomics</strong>: Optimize token supply, allocation, and vesting schedules to align with the IWO model.</li>
              <li><strong>Engage Stakeholders</strong>: Involve community members, advisors, and investors in the model design to ensure alignment.</li>
              <li><strong>Audit and Security</strong>: Conduct rigorous security audits to ensure the smart contracts implementing the IWO are robust.</li>
            </ul>
          </section>

          <section>
            <h4 className="text-xl font-semibold mb-2 flex items-center gap-2" style={{color: colors.secondary}}>
              <Rocket size={20} />
              Phase 2: Execution
            </h4>
            <ul className="list-disc pl-6 mb-4 space-y-2" style={{color: colors.darkGray}}>
              <li>
                <strong>Launch IWO</strong>:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Market the IWO as a community-focused and innovative approach to token allocation.</li>
                  <li>Include detailed guides and FAQs to ensure transparency and understanding.</li>
                </ul>
              </li>
              <li><strong>Monitor Participation</strong>: Adjust parameters based on early participant feedback to maximize engagement.</li>
            </ul>
          </section>

          <section>
            <h4 className="text-xl font-semibold mb-2 flex items-center gap-2" style={{color: colors.secondary}}>
              <Users size={20} />
              Phase 3: Post-IWO Growth
            </h4>
            <ul className="list-disc pl-6 mb-4 space-y-2" style={{color: colors.darkGray}}>
              <li><strong>Reward Long-Term Engagement</strong>: Introduce staking rewards, governance participation, and exclusive benefits for long-term investors.</li>
              <li><strong>Expand Ecosystem Utility</strong>: Increase the utility of the BARK token by integrating it into marketplaces, staking pools, and governance.</li>
              <li><strong>Continuous Optimization</strong>: Regularly evaluate the tokenomics and IWO model to address emerging challenges.</li>
            </ul>
          </section>
        </CardContent>
      </Card>

      <Card className="mb-8 shadow-lg" style={{backgroundColor: colors.primary, borderColor: colors.accent}}>
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center gap-2" style={{color: colors.secondary}}>
            <Shield size={28} />
            Metrics for Success
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal pl-6 mb-4 space-y-4" style={{color: colors.darkGray}}>
            <li>
              <strong>Token Price Stability and Growth</strong>:
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Monitor token price trends over time.</li>
                <li>Reduce price volatility during the early stages.</li>
              </ul>
            </li>
            <li><strong>Investor Retention Rate</strong>: Measure the percentage of tokens held beyond the initial vesting period.</li>
            <li><strong>Community Growth and Engagement</strong>: Track active community members, wallet addresses, and social media engagement.</li>
            <li><strong>Reduction in Inflation Rate</strong>: Compare inflation rates under the IWO model with traditional TGEs.</li>
            <li><strong>VC and Builder Interest</strong>: Measure the number of partnerships, builder applications, and VC funding rounds.</li>
          </ol>
        </CardContent>
      </Card>

      <Card className="mb-8 shadow-lg" style={{backgroundColor: colors.primary, borderColor: colors.accent}}>
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center gap-2" style={{color: colors.secondary}}>
            <Zap size={28} />
            Conclusion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4" style={{color: colors.darkGray}}>
            The <strong>Initial Weight Offering (IWO)</strong> provides a forward-thinking solution to the challenges of token price management. By prioritizing long-term engagement, minimizing inflation, and protecting the community, the model aligns stakeholders' interests and sets the foundation for sustainable growth.
          </p>
          <p className="mb-4" style={{color: colors.darkGray}}>
            This approach ensures a <strong>win-win-win scenario</strong> where the project thrives, investors gain attractive returns, and the community remains engaged and motivated. With the IWO model, BARK can lead the crypto space with a <strong>better incentive design</strong> that fosters trust, stability, and exponential growth.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

