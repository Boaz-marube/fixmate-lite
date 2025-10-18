import React from 'react'
import { ProtectedRoute } from '@/app/components/auth/ProtectedRoute'
import { DashboardHeader } from '@/app/components/dashboard/DashboardHeader'
import { Sidebar } from '@/app/components/dashboard/sidebar'

interface FixerLayoutProps {
  children: React.ReactNode
}

const FixerLayout = ({ children }: FixerLayoutProps) => {
  return (
    <ProtectedRoute allowedRoles={['fixer']}>
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <div className="flex">
          <Sidebar userType="fixer" />
          <main className="flex-1 p-4 sm:p-6 md:ml-0 ml-16 mt-20 min-w-0 overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default FixerLayout