"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell } from "lucide-react"

export function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Booking Accepted",
      message: "John Mwangi accepted your plumbing request",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: "2",
      title: "Payment Confirmed",
      message: "Payment of KSh 2,500 has been processed",
      time: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      title: "Service Completed",
      message: "Your electrical work has been completed",
      time: "2 hours ago",
      read: true,
    },
    {
      id: "4",
      title: "New Fixer Available",
      message: "A new carpenter is available in your area",
      time: "1 day ago",
      read: true,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-white text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="font-semibold text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-secondary hover:text-secondary/80"
            >
              Mark all read
            </Button>
          )}
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className={`p-3 cursor-pointer ${!notification.read ? "bg-blue-50" : ""}`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-foreground text-sm">{notification.title}</h4>
                  {!notification.read && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                </div>
                <p className="text-muted-foreground text-xs mb-1">{notification.message}</p>
                <p className="text-muted-foreground text-xs">{notification.time}</p>
              </div>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
