"use client";

import { Sidebar } from '@/app/components/dashboard/sidebar';
import { DashboardHeader } from '@/app/components/dashboard/DashboardHeader';
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    } else if (!loading && user?.userType !== 'customer') {
      router.push('/login');
    }
  }, [isAuthenticated, loading, user, router]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated || user?.userType !== 'customer') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />
      <div className="flex">
        <Sidebar userType="customer" />
        <main className="flex-1 ml-0 md:ml-44">
          {children}
        </main>
      </div>
    </div>
  );
}