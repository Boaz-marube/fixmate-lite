import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Briefcase, Star, TrendingUp } from "lucide-react"

export function FixerStats() {
  const stats = [
    {
      title: "Today's Earnings",
      value: "KSh 4,500",
      change: "+12%",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Active Jobs",
      value: "3",
      change: "2 pending",
      icon: Briefcase,
      color: "text-primary",
      bgColor: "bg-orange-50",
    },
    {
      title: "Rating",
      value: "4.8",
      change: "128 reviews",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "This Month",
      value: "KSh 67,200",
      change: "+23%",
      icon: TrendingUp,
      color: "text-secondary",
      bgColor: "bg-teal-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </div>
              <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
