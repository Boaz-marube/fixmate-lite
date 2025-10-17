import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Phone, Navigation } from "lucide-react"

export function ActiveJobs() {
  const activeJobs = [
    {
      id: 1,
      service: "Electrical Repair",
      customer: "Sarah Muthoni",
      phone: "+254 712 345 678",
      location: "Parklands, Nairobi",
      time: "In Progress",
      status: "ongoing",
      address: "Apartment 4B, Parklands Plaza",
    },
    {
      id: 2,
      service: "Plumbing Installation",
      customer: "James Kipchoge",
      phone: "+254 723 456 789",
      location: "Lavington, Nairobi",
      time: "Starts in 2 hours",
      status: "scheduled",
      address: "House 12, Lavington Gardens",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Jobs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeJobs.map((job) => (
            <div key={job.id} className="border rounded-lg p-4 bg-orange-50/50 border-primary/20">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{job.service}</h3>
                    <Badge variant={job.status === "ongoing" ? "default" : "secondary"} className="text-xs">
                      {job.status === "ongoing" ? "In Progress" : "Scheduled"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{job.customer}</p>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{job.time}</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{job.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{job.phone}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Customer
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
                {job.status === "ongoing" && (
                  <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                    Complete Job
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
