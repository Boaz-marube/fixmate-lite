import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, User } from "lucide-react"

export function JobRequests() {
  const requests = [
    {
      id: 1,
      service: "Plumbing Repair",
      customer: "John Kamau",
      location: "Westlands, Nairobi",
      time: "Today, 2:00 PM",
      price: "KSh 2,500",
      distance: "3.2 km",
      urgent: true,
    },
    {
      id: 2,
      service: "Electrical Installation",
      customer: "Mary Wanjiku",
      location: "Kilimani, Nairobi",
      time: "Tomorrow, 10:00 AM",
      price: "KSh 3,800",
      distance: "5.1 km",
      urgent: false,
    },
    {
      id: 3,
      service: "Carpentry Work",
      customer: "David Omondi",
      location: "Karen, Nairobi",
      time: "Tomorrow, 3:00 PM",
      price: "KSh 4,200",
      distance: "8.7 km",
      urgent: false,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Job Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="border rounded-lg p-4 hover:border-primary transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{request.service}</h3>
                    {request.urgent && (
                      <Badge variant="destructive" className="text-xs">
                        Urgent
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{request.customer}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{request.distance}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">{request.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{request.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{request.time}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-primary hover:bg-primary/90">Accept Job</Button>
                <Button variant="outline" className="flex-1 bg-transparent">
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
