import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Camera, Star, MapPin, Briefcase, Award } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your professional profile and credentials</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile Photo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="h-32 w-32 rounded-full bg-primary text-white flex items-center justify-center text-4xl font-bold">
                  JM
                </div>
                <Button
                  size="sm"
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full p-0 bg-primary hover:bg-primary/90"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-center">
                <div className="font-semibold text-lg">James Mwangi</div>
                <div className="text-sm text-muted-foreground">Professional Plumber</div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Rating</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold">4.8</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Jobs Completed</span>
                <span className="font-semibold">127</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Member Since</span>
                <span className="font-semibold">Jan 2023</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Professional Information</CardTitle>
            <CardDescription>Update your professional details and credentials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="James" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Mwangi" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="james.mwangi@fixmate.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue="+254 712 345 678" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="flex gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground mt-2" />
                <Input id="location" defaultValue="Westlands, Nairobi" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea
                id="bio"
                rows={4}
                defaultValue="Experienced plumber with over 5 years in residential and commercial plumbing. Specialized in leak repairs, pipe installations, and emergency services. Committed to quality work and customer satisfaction."
              />
            </div>

            <div className="space-y-2">
              <Label>Specializations</Label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-teal text-white">
                  <Briefcase className="h-3 w-3 mr-1" />
                  Plumbing
                </Badge>
                <Badge variant="secondary">Leak Repair</Badge>
                <Badge variant="secondary">Pipe Installation</Badge>
                <Badge variant="secondary">Emergency Services</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Certifications</Label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-primary text-primary">
                  <Award className="h-3 w-3 mr-1" />
                  Licensed Plumber
                </Badge>
                <Badge variant="outline">Safety Certified</Badge>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button className="bg-primary hover:bg-primary/90">Save Changes</Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
