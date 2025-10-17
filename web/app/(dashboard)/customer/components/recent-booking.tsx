import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Star } from "lucide-react"

export function RecentBookings() {
  const bookings = [
    {
      id: "1",
      fixerName: "John Mwangi",
      service: "Plumbing",
      status: "completed",
      date: "2024-01-15",
      price: "KSh 2,500",
      rating: 5,
      location: "Westlands, Nairobi",
    },
    {
      id: "2",
      fixerName: "Sarah Wanjiku",
      service: "Electrical",
      status: "accepted",
      date: "2024-01-18",
      price: "KSh 3,200",
      location: "Karen, Nairobi",
    },
    {
      id: "3",
      fixerName: "David Ochieng",
      service: "Carpentry",
      status: "pending",
      date: "2024-01-20",
      price: "KSh 4,800",
      location: "Kilimani, Nairobi",
    },
    {
      id: "4",
      fixerName: "Grace Akinyi",
      service: "Painting",
      status: "canceled",
      date: "2024-01-12",
      price: "KSh 1,800",
      location: "Lavington, Nairobi",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-secondary/10 text-secondary"
      case "completed":
        return "bg-green-100 text-green-800"
      case "canceled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold text-foreground">Recent Bookings</CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="border-secondary text-secondary hover:bg-secondary hover:text-white bg-transparent"
        >
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-semibold text-foreground">{booking.fixerName}</h4>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="font-medium">{booking.service}</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {booking.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {booking.location}
                  </div>
                </div>
                {booking.rating && (
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(booking.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="font-bold text-foreground">{booking.price}</div>
                <Button variant="ghost" size="sm" className="text-secondary hover:text-secondary/80">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
