import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Phone, Star, MessageSquare } from "lucide-react"

export default function BookingsPage() {
  const upcomingBookings = [
    {
      id: 1,
      service: "Plumbing",
      fixer: "James Mwangi",
      date: "2024-01-20",
      time: "10:00 AM",
      location: "Westlands, Nairobi",
      price: "KSh 2,500",
      status: "confirmed",
      phone: "+254 712 345 678",
    },
    {
      id: 2,
      service: "Electrical",
      fixer: "Sarah Wanjiku",
      date: "2024-01-22",
      time: "2:00 PM",
      location: "Kilimani, Nairobi",
      price: "KSh 3,000",
      status: "pending",
      phone: "+254 723 456 789",
    },
  ]

  const completedBookings = [
    {
      id: 3,
      service: "Carpentry",
      fixer: "Peter Omondi",
      date: "2024-01-15",
      time: "9:00 AM",
      location: "Karen, Nairobi",
      price: "KSh 4,500",
      status: "completed",
      rating: 5,
      phone: "+254 734 567 890",
    },
    {
      id: 4,
      service: "Painting",
      fixer: "Mary Akinyi",
      date: "2024-01-10",
      time: "11:00 AM",
      location: "Lavington, Nairobi",
      price: "KSh 5,000",
      status: "completed",
      rating: 4,
      phone: "+254 745 678 901",
    },
  ]

  const canceledBookings = [
    {
      id: 5,
      service: "Plumbing",
      fixer: "John Kamau",
      date: "2024-01-08",
      time: "3:00 PM",
      location: "Parklands, Nairobi",
      price: "KSh 2,000",
      status: "canceled",
      phone: "+254 756 789 012",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-teal-100 text-teal-700 border-teal-200"
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "completed":
        return "bg-green-100 text-green-700 border-green-200"
      case "canceled":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 rounded-lg flex">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Bookings</h1>
              <p className="text-muted-foreground mt-1">Manage all your service bookings</p>
            </div>

            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-3 max-w-md">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="canceled">Canceled</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-4 mt-6">
                {upcomingBookings.map((booking) => (
                  <Card key={booking.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-4 flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-3">
                              <h3 className="text-xl font-bold text-foreground">{booking.service}</h3>
                              <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                            </div>
                            <p className="text-muted-foreground mt-1">with {booking.fixer}</p>
                          </div>
                          <p className="text-xl font-bold text-primary">{booking.price}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {booking.date} at {booking.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{booking.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <span>{booking.phone}</span>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message Fixer
                          </Button>
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 bg-transparent"
                          >
                            Cancel Booking
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4 mt-6">
                {completedBookings.map((booking) => (
                  <Card key={booking.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-4 flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-3">
                              <h3 className="text-xl font-bold text-foreground">{booking.service}</h3>
                              <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                            </div>
                            <p className="text-muted-foreground mt-1">with {booking.fixer}</p>
                          </div>
                          <p className="text-xl font-bold text-foreground">{booking.price}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {booking.date} at {booking.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{booking.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>Rated {booking.rating}/5</span>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button size="sm">Book Again</Button>
                          <Button variant="outline" size="sm">
                            View Receipt
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="canceled" className="space-y-4 mt-6">
                {canceledBookings.map((booking) => (
                  <Card key={booking.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-4 flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-3">
                              <h3 className="text-xl font-bold text-foreground">{booking.service}</h3>
                              <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                            </div>
                            <p className="text-muted-foreground mt-1">with {booking.fixer}</p>
                          </div>
                          <p className="text-xl font-bold text-muted-foreground line-through">{booking.price}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {booking.date} at {booking.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{booking.location}</span>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button size="sm">Book Again</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
