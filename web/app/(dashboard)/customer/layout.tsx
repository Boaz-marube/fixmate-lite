import React from 'react'
import { ProtectedRoute } from '@/app/components/auth/ProtectedRoute'
import { DashboardHeader } from '@/app/components/dashboard/DashboardHeader'
import { Sidebar } from '../../components/dashboard/sidebar'

interface CustomerLayoutProps {
  children: React.ReactNode
}

const CustomerLayout = ({ children }: CustomerLayoutProps) => {
  return (
    <ProtectedRoute allowedRoles={['customer']}>
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <div className="flex">
          <Sidebar userType="customer" />
          <main className="flex-1 p-6 md:ml-0 ml-16 mt-20">
            {children}
          </main>
        </div>
       </div>
    </ProtectedRoute>
  )
}

export default CustomerLayout