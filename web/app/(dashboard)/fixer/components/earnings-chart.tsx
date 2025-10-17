"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const data = [
  { day: "Mon", earnings: 3200 },
  { day: "Tue", earnings: 4500 },
  { day: "Wed", earnings: 3800 },
  { day: "Thu", earnings: 5200 },
  { day: "Fri", earnings: 4800 },
  { day: "Sat", earnings: 6500 },
  { day: "Sun", earnings: 3900 },
]

export function EarningsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Earnings</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip
              formatter={(value) => [`KSh ${value}`, "Earnings"]}
              contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb" }}
            />
            <Bar dataKey="earnings" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
