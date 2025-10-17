"use client";

import { useAuth } from '@/app/contexts/AuthContext';
import { LogoutButton } from '../auth/LogoutButton';
import { ModeToggle } from '../theme/mode-toggle';
import Link from 'next/link';
import Image from 'next/image';

export function DashboardHeader() {
  const { user } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 fixed w-full h-20 z-10">
      <div className="flex items-center justify-between">
        {/* Left side - Logo and user info */}
        <div className="flex items-center space-x-4">
        <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 p-0.5">
                <Image
                  src="/fix-logo.svg"
                  alt="FixMate Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover rounded-full bg-none"
                />
              </div>
              <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white font-[Poppins]">
                
              </span>
            </Link>
          <div className="hidden md:block text-gray-500 dark:text-gray-400">|</div>
          <div className="hidden md:block">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Welcome, <span className="font-medium text-gray-900 dark:text-white">{user?.name}</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 capitalize">
              {user?.userType} Dashboard
            </p>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-3">
          <ModeToggle />
          <LogoutButton variant="outline" size="sm" />
        </div>
      </div>
    </header>
  );
}