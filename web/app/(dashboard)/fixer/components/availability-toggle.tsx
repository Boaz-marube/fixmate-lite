"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

export function AvailabilityToggle() {
  const [isAvailable, setIsAvailable] = useState(true)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="availability" className="text-base font-medium">
              {isAvailable ? "You're Available" : "You're Offline"}
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              {isAvailable ? "You can receive new job requests" : "You won't receive new job requests"}
            </p>
          </div>
          <Switch
            id="availability"
            checked={isAvailable}
            onCheckedChange={setIsAvailable}
            className="data-[state=checked]:bg-green-600"
          />
        </div>
      </CardContent>
    </Card>
  )
}
