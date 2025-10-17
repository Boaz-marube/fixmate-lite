import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, User } from "lucide-react"

export default function JobRequestsPage() {
  const jobRequests = [
    {
      id: 1,
      service: "Plumbing Repair",
      customer: "John Doe",
      location: "Westlands, Nairobi",
      time: "2 hours ago",
      price: "KSh 2,500",
      description: "Leaking kitchen sink needs urgent repair",
      urgent: true,
    },
    {
      id: 2,
      service: "Electrical Installation",
      customer: "Sarah Kimani",
      location: "Kilimani, Nairobi",
      time: "4 hours ago",
      price: "KSh 3,800",
      description: "Install ceiling fan in living room",
      urgent: false,
    },
    {
      id: 3,
      service: "Carpentry Work",
      customer: "Michael Ochieng",
      location: "Karen, Nairobi",
      time: "6 hours ago",
      price: "KSh 5,200",
      description: "Build custom bookshelf for home office",
      urgent: false,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Job Requests</h1>
        <p className="text-muted-foreground mt-2">Review and respond to new job requests from customers</p>
      </div>

      <div className="grid gap-4">
        {jobRequests.map((job) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl">{job.service}</CardTitle>
                    {job.urgent && (
                      <Badge variant="destructive" className="text-xs">
                        Urgent
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{job.description}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{job.price}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{job.customer}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{job.time}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1 bg-primary hover:bg-primary/90">Accept Job</Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Decline
                  </Button>
                  <Button variant="ghost">View Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
