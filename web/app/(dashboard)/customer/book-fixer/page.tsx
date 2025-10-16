"use client"

import { useState } from "react"
import { ServiceSelection } from "../components/service-selection"
import { LocationPicker } from "../components/location-picker"
import { FixerSelection } from "../components/fixer-selection"
import { BookingConfirmation } from "../components/booking-confirmation"

type BookingStep = "service" | "location" | "fixer" | "confirmation"

export default function BookPage() {
  const [currentStep, setCurrentStep] = useState<BookingStep>("service")
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedFixer, setSelectedFixer] = useState<string | null>(null)

  const handleServiceSelect = (service: string) => {
    setSelectedService(service)
  }

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location)
  }

  const handleFixerSelect = (fixerId: string) => {
    setSelectedFixer(fixerId)
  }

  const handleConfirmBooking = () => {
    // TODO: Implement booking confirmation logic
    console.log("Booking confirmed:", {
      service: selectedService,
      location: selectedLocation,
      fixer: selectedFixer,
    })
    // Redirect to success page or dashboard
  }

  const renderStep = () => {
    switch (currentStep) {
      case "service":
        return (
          <ServiceSelection
            selectedService={selectedService}
            onServiceSelect={handleServiceSelect}
            onNext={() => setCurrentStep("location")}
          />
        )
      case "location":
        return (
          <LocationPicker
            selectedLocation={selectedLocation}
            onLocationSelect={handleLocationSelect}
            onNext={() => setCurrentStep("fixer")}
            onBack={() => setCurrentStep("service")}
          />
        )
      case "fixer":
        return (
          <FixerSelection
            selectedFixer={selectedFixer}
            onFixerSelect={handleFixerSelect}
            onNext={() => setCurrentStep("confirmation")}
            onBack={() => setCurrentStep("location")}
            serviceType={selectedService || ""}
          />
        )
      case "confirmation":
        return (
          <BookingConfirmation
            serviceType={selectedService || ""}
            location={selectedLocation}
            fixerId={selectedFixer || ""}
            onConfirm={handleConfirmBooking}
            onBack={() => setCurrentStep("fixer")}
          />
        )
      default:
        return null
    }
  }

  // Progress indicator
  const steps = ["service", "location", "fixer", "confirmation"]
  const currentStepIndex = steps.indexOf(currentStep)

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 rounded-lg pt-3 flex">
      <div className="flex-1 flex flex-col">
          {/* Progress Indicator */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex items-center justify-center">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index <= currentStepIndex ? "bg-primary text-white" : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mx-2 ${index < currentStepIndex ? "bg-primary" : "bg-gray-300"}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-2">
              <span className="text-sm text-muted-foreground capitalize">
                Step {currentStepIndex + 1} of {steps.length}: {currentStep.replace("_", " ")}
              </span>
            </div>
          </div>

          {/* Step Content */}
          <div className="max-w-6xl mx-auto">{renderStep()}</div>
        {/* </main> */}
      </div>
    </div>
  )
}
