"use client"

import { useMemo, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Sector } from 'recharts'
import { colors } from '@/lib/colors'
import { Bid, calculateTokenAllocation, CIRCULATING_SUPPLY } from '@/utils/iwoUtils'

type RenderActiveShapeProps = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: { name: string; value: number };
  percent: number;
  value: number;
};

interface TokenAllocationChartProps {
  bids: Bid[];
  totalWeight: number;
}

const renderActiveShape = (props: RenderActiveShapeProps) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value.toLocaleString()} BARK`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export function TokenAllocationChart({ bids, totalWeight }: TokenAllocationChartProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const availableTokens = CIRCULATING_SUPPLY;

  const data = useMemo(() => bids.map(bid => {
    const allocation = calculateTokenAllocation(bid, totalWeight, availableTokens);
    return {
      name: bid.userId.slice(0, 6) + '...' + bid.userId.slice(-4),
      value: isNaN(allocation) ? 0 : allocation
    };
  }).filter(item => item.value > 0), [bids, totalWeight, availableTokens]);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

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
              label: "Wallet Address",
              color: colors.secondary,
            },
            value: {
              label: "Allocated Tokens",
              color: colors.darkGray,
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%" aria-label="Pie chart showing BARK token allocation among bidders">
            {data.length === 0 ? (
              <text x="50%" y="50%" textAnchor="middle" fill={colors.secondary}>
                No bids available
              </text>
            ) : (
              <PieChart>
                <title>BARK Token Allocation</title>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={(props: any) => renderActiveShape(props as RenderActiveShapeProps)}
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors.chartColors[index % colors.chartColors.length]} />
                  ))}
                </Pie>
                <Legend 
                  formatter={(value: string) => (
                    <span style={{ color: colors.secondary, fontSize: '12px' }}>{value}</span>
                  )}
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                />
                <ChartTooltip
                  content={
                    ({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <ChartTooltipContent
                            content={
                              <div className="flex flex-col gap-1">
                                <p className="text-sm font-bold">{data.name}</p>
                                <p className="text-sm">{data.value.toLocaleString()} BARK</p>
                              </div>
                            }
                          />
                        );
                      }
                      return null;
                    }
                  }
                />
              </PieChart>
            )}
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

