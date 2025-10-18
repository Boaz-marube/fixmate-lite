import { FixerStats } from "./components/fixer-stats"
import { JobRequests } from "./components/job-requests"
import { ActiveJobs } from "./components/active-jobs"

import { AvailabilityToggle } from "./components/availability-toggle"

export default function FixerDashboard() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Stats */}
      <FixerStats />

      {/* Availability Toggle */}
      <AvailabilityToggle />

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Job Requests */}
        <JobRequests />

        {/* Active Jobs */}
        <ActiveJobs />
      </div>

      {/* Earnings Chart */}
      {/* <EarningsChart /> */}
    </div>
  )
}
