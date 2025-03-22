"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { OpinionTrendPoint } from "@/lib/api-types"

interface OpinionTrendChartProps {
  data: OpinionTrendPoint[]
}

export function OpinionTrendChart({ data }: OpinionTrendChartProps) {
  return (
    <div className="w-full">
      <ChartContainer
        config={{
          positive: {
            label: "正面评价",
            color: "hsl(var(--chart-1))",
          },
          negative: {
            label: "负面评价",
            color: "hsl(var(--chart-2))",
          },
          neutral: {
            label: "中性评价",
            color: "hsl(var(--chart-3))",
          },
        }}
        className="h-[400px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Line type="monotone" dataKey="positive" stroke="var(--color-positive)" strokeWidth={2} />
            <Line type="monotone" dataKey="negative" stroke="var(--color-negative)" strokeWidth={2} />
            <Line type="monotone" dataKey="neutral" stroke="var(--color-neutral)" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}

