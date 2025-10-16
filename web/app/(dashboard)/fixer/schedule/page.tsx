import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, User } from "lucide-react"

export default function SchedulePage() {
  const schedule = [
    {
      id: 1,
      date: "Today, Jan 15",
      jobs: [
        {
          time: "9:00 AM - 11:00 AM",
          service: "Plumbing Repair",
          customer: "Jane Smith",
          location: "Westlands, Nairobi",
          status: "confirmed",
        },
        {
          time: "2:00 PM - 4:00 PM",
          service: "Electrical Work",
          customer: "David Mwangi",
          location: "Kilimani, Nairobi",
          status: "confirmed",
        },
      ],
    },
    {
      id: 2,
      date: "Tomorrow, Jan 16",
      jobs: [
        {
          time: "10:00 AM - 12:00 PM",
          service: "Carpentry",
          customer: "Mary Wanjiku",
          location: "Karen, Nairobi",
          status: "pending",
        },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Schedule</h1>
          <p className="text-muted-foreground mt-2">View and manage your upcoming jobs</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Calendar className="h-4 w-4 mr-2" />
          Calendar View
        </Button>
      </div>

      <div className="space-y-6">
        {schedule.map((day) => (
          <div key={day.id} className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">{day.date}</h2>
            <div className="grid gap-4">
              {day.jobs.map((job, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={job.status === "confirmed" ? "default" : "secondary"}
                            className={job.status === "confirmed" ? "bg-teal text-white" : ""}
                          >
                            {job.status}
                          </Badge>
                          <span className="font-semibold text-lg">{job.service}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{job.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{job.customer}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="ghost" size="sm">
                          Get Directions
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
