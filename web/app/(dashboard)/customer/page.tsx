import { QuickActions } from "./components/quick-actions"
import { RecentBookings } from "./components/recent-booking"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 flex rounded-lg">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6">
          <div className="space-y-8">
            <QuickActions />
            <RecentBookings />
          </div>
        </main>
      </div>
    </div>
  )
}
