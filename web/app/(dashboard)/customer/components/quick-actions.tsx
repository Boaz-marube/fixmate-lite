import { Card, CardContent } from "@/components/ui/card"
import { Wrench, Calendar, List } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      title: "Book a Fixer",
      description: "Find and book trusted fixers",
      icon: Wrench,
      href: "/dashboard/book",
      color: "bg-primary",
    },
    {
      title: "View My Bookings",
      description: "Check your booking status",
      icon: Calendar,
      href: "/dashboard/bookings",
      color: "bg-secondary",
    },
    {
      title: "Explore FixList",
      description: "Browse available fixers",
      icon: List,
      href: "/dashboard/fixlist",
      color: "bg-gray-500",
    },
  ]

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {actions.map((action) => (
        <Link key={action.href} href={action.href}>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardContent className="p-6">
              <div
                className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{action.title}</h3>
              <p className="text-muted-foreground text-sm">{action.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
