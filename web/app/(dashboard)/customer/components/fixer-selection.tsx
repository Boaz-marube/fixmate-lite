"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, MapPin } from "lucide-react"
import Image from "next/image"

interface FixerSelectionProps {
  selectedFixer: string | null
  onFixerSelect: (fixerId: string) => void
  onNext: () => void
  onBack: () => void
  serviceType: string
}

export function FixerSelection({ selectedFixer, onFixerSelect, onNext, onBack, serviceType }: FixerSelectionProps) {
  const fixers = [
    {
      id: "1",
      name: "John Mwangi",
      photo: "/professional-man-smiling.png",
      rating: 4.9,
      reviewCount: 127,
      specialty: "Master Plumber",
      experience: "8 years",
      eta: "25 mins",
      price: "KSh 2,500",
      verified: true,
      description: "Specialized in residential and commercial plumbing with quick response times.",
    },
    {
      id: "2",
      name: "Sarah Wanjiku",
      photo: "/professional-woman-smiling.png",
      rating: 4.8,
      reviewCount: 89,
      specialty: "Licensed Electrician",
      experience: "6 years",
      eta: "30 mins",
      price: "KSh 3,200",
      verified: true,
      description: "Expert in electrical installations and repairs. Safety-first approach.",
    },
    {
      id: "3",
      name: "David Ochieng",
      photo: "/professional-man-smiling.png",
      rating: 4.7,
      reviewCount: 156,
      specialty: "Carpenter & Joiner",
      experience: "10 years",
      eta: "45 mins",
      price: "KSh 4,800",
      verified: true,
      description: "Custom furniture and repair specialist. Quality craftsmanship guaranteed.",
    },
    {
      id: "4",
      name: "Grace Akinyi",
      photo: "/professional-woman-smiling.png",
      rating: 4.6,
      reviewCount: 73,
      specialty: "Professional Painter",
      experience: "5 years",
      eta: "35 mins",
      price: "KSh 1,800",
      verified: true,
      description: "Interior and exterior painting with attention to detail and clean finish.",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Available Fixers</h2>
        <p className="text-muted-foreground">Choose from verified professionals in your area</p>
      </div>

      <div className="space-y-4">
        {fixers.map((fixer) => (
          <Card
            key={fixer.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedFixer === fixer.id
                ? "border-2 border-secondary bg-secondary/5"
                : "border hover:border-secondary/50"
            }`}
            onClick={() => onFixerSelect(fixer.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {/* Fixer Photo */}
                <Image
                  src={fixer.photo || "/placeholder.svg"}
                  alt={fixer.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full object-cover"
                />

                {/* Fixer Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-foreground text-lg">{fixer.name}</h3>
                        {fixer.verified && <Badge className="bg-green-100 text-green-800 text-xs">Verified</Badge>}
                      </div>
                      <p className="text-secondary font-medium">{fixer.specialty}</p>
                      <p className="text-sm text-muted-foreground">{fixer.experience} experience</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-foreground">{fixer.price}</div>
                      <div className="text-sm text-muted-foreground">Estimated cost</div>
                    </div>
                  </div>

                  {/* Rating and ETA */}
                  <div className="flex items-center gap-6 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{fixer.rating}</span>
                      <span className="text-muted-foreground text-sm">({fixer.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">ETA: {fixer.eta}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">Nearby</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4">{fixer.description}</p>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-secondary text-secondary hover:bg-secondary hover:text-white bg-transparent"
                    >
                      View Profile
                    </Button>
                    <Button
                      size="sm"
                      className={`font-bold ${
                        selectedFixer === fixer.id
                          ? "bg-secondary hover:bg-secondary/90"
                          : "bg-primary hover:bg-primary/90"
                      } text-white`}
                      onClick={(e) => {
                        e.stopPropagation()
                        onFixerSelect(fixer.id)
                      }}
                    >
                      {selectedFixer === fixer.id ? "SELECTED" : "SELECT"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4">
        <Button
          onClick={onBack}
          variant="outline"
          className="border-gray-300 text-foreground hover:bg-gray-50 px-8 py-3 bg-transparent"
        >
          BACK
        </Button>
        {selectedFixer && (
          <Button onClick={onNext} className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3">
            CONTINUE TO BOOKING
          </Button>
        )}
      </div>
    </div>
  )
}
