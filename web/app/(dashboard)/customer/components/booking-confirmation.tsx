"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { MapPin, Clock, Star, CreditCard, Smartphone, Banknote } from "lucide-react"
import Image from "next/image"

interface BookingConfirmationProps {
  serviceType: string
  location: string
  fixerId: string
  onConfirm: () => void
  onBack: () => void
}

export function BookingConfirmation({ serviceType, location, fixerId, onConfirm, onBack }: BookingConfirmationProps) {
  const [paymentMethod, setPaymentMethod] = useState("mpesa")

  // Mock data - in real app, this would come from props or API
  const fixer = {
    name: "John Mwangi",
    photo: "/professional-man-smiling.png",
    rating: 4.9,
    specialty: "Master Plumber",
    eta: "25 mins",
    price: 2500,
  }

  const serviceFee = 250
  const total = fixer.price + serviceFee

  const paymentOptions = [
    { id: "mpesa", label: "M-Pesa", icon: Smartphone, description: "Pay with your mobile money" },
    { id: "card", label: "Credit/Debit Card", icon: CreditCard, description: "Visa, Mastercard accepted" },
    { id: "cash", label: "Cash on Delivery", icon: Banknote, description: "Pay when service is completed" },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Confirm Your Booking</h2>
        <p className="text-muted-foreground">Review details and complete your booking</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Booking Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground">Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Service Details */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-foreground capitalize">{serviceType} Service</h3>
                <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                  <MapPin className="h-4 w-4" />
                  {location}
                </div>
              </div>
              <Badge className="bg-secondary/10 text-secondary">Scheduled</Badge>
            </div>

            <Separator />

            {/* Fixer Details */}
            <div className="flex items-center gap-4">
              <Image
                src={fixer.photo || "/placeholder.svg"}
                alt={fixer.name}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{fixer.name}</h4>
                <p className="text-secondary text-sm">{fixer.specialty}</p>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{fixer.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">ETA: {fixer.eta}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground">Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
              {paymentOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <option.icon className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <Label htmlFor={option.id} className="font-medium text-foreground cursor-pointer">
                      {option.label}
                    </Label>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Price Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground">Price Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service Cost</span>
              <span className="font-medium">KSh {fixer.price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service Fee</span>
              <span className="font-medium">KSh {serviceFee.toLocaleString()}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span className="text-foreground">Total</span>
              <span className="text-primary">KSh {total.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
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
        <Button onClick={onConfirm} className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3">
          CONFIRM & PAY
        </Button>
      </div>
    </div>
  )
}
