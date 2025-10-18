"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { customerService } from '../../services/customer.service'
import { fixerService } from '../../services/fixer.service'
import Link from "next/link"
import {
    Calendar,
    Home,
    Bell,
    User,
    Stethoscope,
    ClipboardList,
    BarChart3,
    Activity,
    Shield,
    Wrench,
    Calendar1Icon,
    DollarSign,
    Star,
    SettingsIcon,
    Book,
  } from "lucide-react"
import { formatAdminName, formatCustomerName, formatFixerName } from "@/lib/name-utils"


interface User {
    id: string
    name: string
    email: string
    userType: 'customer' | 'fixer' | 'admin'
}
interface SidebarProps {
userType?: 'customer' | 'fixer' | 'admin'
isOpen?: boolean
onToggle?: () => void
}

export function Sidebar({userType}: SidebarProps){
const [user, setUser] = useState<User | null>(null);
const [customerProfile, setCustomerProfile] = useState<any>(null)
const [fixerProfile, setFixerProfile] = useState<any>(null)
const [adminProfile, setAdminProfile] = useState<any>(null)
const router = useRouter()
const pathname = usePathname()

useEffect(()=>{
    const userData = localStorage.getItem('user')
    if (userData) {
        try {
            const parsedUser = JSON.parse(userData)
            setUser(parsedUser)
            
            if (parsedUser.userType === 'fixer') {
            fetchFixerProfile(parsedUser.id)
            } else if (parsedUser.userType === 'customer') {
            fetchCustomerProfile(parsedUser.id)
            } 
        } catch (error) {
            console.error('Failed to parse user data:', error)
        }
        }
    
},[])


const fetchFixerProfile = async (fixerId: string) => {
    const profile = await fixerService.getProfile(fixerId)
    if (profile) {
    setFixerProfile(profile)
    }
}

const fetchCustomerProfile = async (customerId: string) => {
    const profile = await customerService.getProfile(customerId)
    if (profile) {
    setCustomerProfile(profile)
    }
}



const getMenuItems = () => {
    switch (userType) {
        case 'customer':
            return [
                { id:'home' ,label: 'Home',icon:Home , path: '/customer' },
                { id:'book' ,label: 'Book Fixer',icon: Book, path: '/customer/book-fixer' },
                { id:'bookings' ,label: 'My Bookings',icon: Calendar, path: '/customer/bookings' },
                { id:'fixlist' ,label: 'FixList',icon: Activity, path: '/customer/fixlist' },
                { id:'fixtips' ,label: 'FixTips',icon: Bell, path: '/customer/fixtips' },
                { id:'profile' ,label: 'My Profile',icon: User, path: '/customer/profile' },
            ]
        case 'fixer':
            return [
                { id:'home' ,label: 'Home',icon: Home, path: '/fixer' },
                { id:'job-requests' ,label: 'Job Requests',icon: Activity, path: '/fixer/jobs' },
                { id:'schedule' ,label: 'Schedule',icon: Calendar1Icon, path: '/fixer/schedule' },
                { id:'earnings' ,label: 'Earnings',icon: DollarSign, path: '/fixer/earnings' },
                { id:'fixtips' ,label: 'FixTips',icon: Bell, path: '/fixer/fixtips' },
                { id:'profile' ,label: 'Profile',icon: User, path: '/fixer/profile' },
              
            ]
        case 'admin':
            return [
                { id:'home' ,label: 'Home',icon: Home, path: '/admin' },
                { id:'manage-fixers' ,label: 'Fixer Management',icon: Wrench, path: '/admin/fixer-management' },
                { id: 'customers' ,label: 'Customer Management',icon: User, path: '/admin/user-management' },
                { id: 'bookings' ,label: 'Bookings',icon: Activity, path: '/admin/bookings' },
                { id:'fixtips' ,label: 'FixTips',icon: Bell, path: '/admin/fixtips' },
                { id:'claims' ,label: 'Claims',icon: ClipboardList, path: '/admin/claims' },
                { id:'reports' ,label: 'Reports',icon: BarChart3, path: '/admin/reports' },
            ]
        default:
            return []
    }
}

const menuItems = getMenuItems()

const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    router.push('/')

}

const getUserInfo = () => {
    switch (userType) {
        case "customer":
          const customerName = customerProfile?.name || user?.name || 'Loading...'
          if (customerName === 'Loading...') {
            return { name: customerName, icon: User }
          }
          return { name: formatCustomerName(customerName), icon: User }
        case "fixer":
          const fixerName = fixerProfile?.name || user?.name || 'Loading...'
          if (fixerName === 'Loading...') {
            return { name: fixerName, icon: Stethoscope }
          }
          return { name: formatFixerName(fixerName), icon: Stethoscope }
        case "admin":
          const adminName = adminProfile?.name || user?.name || 'Loading...'
          if (adminName === 'Loading...') {
            return { name: adminName, icon: ClipboardList }
          }
          return { name: formatAdminName(adminName), icon: ClipboardList }
        default:
          return { name: user?.name || 'Loading...', icon: User }
      }
}

const userInfo = getUserInfo()
const UserIcon = userInfo.icon

return(
    <>
        <div className='hidden md:flex w-44 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-[calc(100vh-5rem)] flex-col overflow-hidden sticky top-20 z-20'>
           
                   {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path
            return (
              <Link
                key={item.id}
                href={item.path as any}
                className={`w-full flex items-center justify-start px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <Icon className="h-4 w-4 mr-3" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        </div>


      {/* Mobile Icons-Only Sidebar */}
      <div className="md:hidden fixed left-0 top-20 w-16 bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full flex flex-col items-center py-4 z-30">
        {/* User Profile Icon
        <div className="mb-6">
          <div className="bg-orange-500 rounded-full p-2">
            <UserIcon className="h-5 w-5 text-white" />
          </div>
        </div> */}

        {/* Navigation Icons */}
        <nav className="flex-1 space-y-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path
            return (
              <Link
                key={item.id}
                href={item.path as any}
                className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                title={item.label}
              >
                <Icon className="h-5 w-5" />
              </Link>
            )
          })}
        </nav>
        </div>

    </>
)
}
