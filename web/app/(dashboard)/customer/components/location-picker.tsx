"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Navigation } from "lucide-react"

interface LocationPickerProps {
  selectedLocation: string
  onLocationSelect: (location: string) => void
  onNext: () => void
  onBack: () => void
}

export function LocationPicker({ selectedLocation, onLocationSelect, onNext, onBack }: LocationPickerProps) {
  const [address, setAddress] = useState(selectedLocation)

  const handleLocationChange = (value: string) => {
    setAddress(value)
    onLocationSelect(value)
  }

  const handleUseCurrentLocation = () => {
    // Simulate getting current location
    const currentLocation = "Westlands, Nairobi, Kenya"
    setAddress(currentLocation)
    onLocationSelect(currentLocation)
  }

  const popularLocations = [
    "Westlands, Nairobi",
    "Karen, Nairobi",
    "Kilimani, Nairobi",
    "Lavington, Nairobi",
    "Runda, Nairobi",
    "Kileleshwa, Nairobi",
    "Parklands, Nairobi",
    "South B, Nairobi",
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Where do you need service?</h2>
        <p className="text-muted-foreground">Enter your address or select from popular locations</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Address Input */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="address" className="text-foreground font-medium">
                  Service Address
                </Label>
                <div className="relative mt-2">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="address"
                    type="text"
                    placeholder="Enter your full address"
                    value={address}
                    onChange={(e) => handleLocationChange(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-secondary focus:ring-secondary"
                  />
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={handleUseCurrentLocation}
                className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white bg-transparent"
              >
                <Navigation className="h-4 w-4 mr-2" />
                Use Current Location
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Map Placeholder */}
        <Card>
          <CardContent className="p-6">
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Interactive Map</p>
                <p className="text-sm text-muted-foreground">Pin will appear when address is entered</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Popular Locations */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">Popular Locations</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {popularLocations.map((location) => (
              <Button
                key={location}
                variant="outline"
                size="sm"
                onClick={() => handleLocationChange(location)}
                className="text-left justify-start border-gray-300 hover:border-secondary hover:text-secondary"
              >
                {location}
              </Button>
            ))}
          </div>
        </div>
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
        {address && (
          <Button onClick={onNext} className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3">
            FIND FIXERS
          </Button>
        )}
      </div>
    </div>
  )
}
