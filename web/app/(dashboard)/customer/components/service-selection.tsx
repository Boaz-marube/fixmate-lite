"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Wrench, Zap, Hammer, Paintbrush, Car, Drill, Pipette as Pipe, Lightbulb } from "lucide-react"

interface ServiceSelectionProps {
  selectedService: string | null
  onServiceSelect: (service: string) => void
  onNext: () => void
}

export function ServiceSelection({ selectedService, onServiceSelect, onNext }: ServiceSelectionProps) {
  const services = [
    {
      id: "plumbing",
      icon: Pipe,
      name: "Plumbing",
      description: "Pipes, leaks, installations, repairs",
      price: "From KSh 1,500",
    },
    {
      id: "electrical",
      icon: Zap,
      name: "Electrical",
      description: "Wiring, outlets, switches, repairs",
      price: "From KSh 2,000",
    },
    {
      id: "carpentry",
      icon: Hammer,
      name: "Carpentry",
      description: "Furniture, doors, cabinets, repairs",
      price: "From KSh 2,500",
    },
    {
      id: "painting",
      icon: Paintbrush,
      name: "Painting",
      description: "Interior & exterior painting",
      price: "From KSh 1,200",
    },
    {
      id: "automotive",
      icon: Car,
      name: "Automotive",
      description: "Car repairs & maintenance",
      price: "From KSh 3,000",
    },
    {
      id: "handyman",
      icon: Drill,
      name: "General Handyman",
      description: "General repairs & maintenance",
      price: "From KSh 1,000",
    },
    {
      id: "appliance",
      icon: Lightbulb,
      name: "Appliance Repair",
      description: "Home appliance fixes",
      price: "From KSh 1,800",
    },
    {
      id: "hvac",
      icon: Wrench,
      name: "HVAC",
      description: "Heating & cooling systems",
      price: "From KSh 4,000",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Choose Your Service</h2>
        <p className="text-muted-foreground">Select the type of service you need</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <Card
            key={service.id}
            className={cn(
              "cursor-pointer transition-all hover:shadow-lg",
              selectedService === service.id
                ? "border-2 border-secondary bg-secondary/5"
                : "border hover:border-secondary/50",
            )}
            onClick={() => onServiceSelect(service.id)}
          >
            <CardContent className="p-6 text-center">
              <div
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors",
                  selectedService === service.id ? "bg-secondary text-white" : "bg-primary/10 text-primary",
                )}
              >
                <service.icon className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{service.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
              <p className="text-sm font-semibold text-secondary">{service.price}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedService && (
        <div className="flex justify-center">
          <Button onClick={onNext} className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3">
            CONTINUE TO LOCATION
          </Button>
        </div>
      )}
    </div>
  )
}
