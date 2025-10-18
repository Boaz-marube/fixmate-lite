"use client";

import { useAuth } from '@/app/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { customerService } from '@/app/services/customer.service';

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (user?.id) {
        const userBookings = await customerService.getBookings(user.id);
        setBookings(userBookings);
      }
      setLoading(false);
    };

    fetchBookings();
  }, [user]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your bookings and find trusted fixers
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Bookings</h3>
          <p className="text-3xl font-bold text-orange-500">{bookings.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Bookings</h3>
          <p className="text-3xl font-bold text-blue-500">
            {bookings.filter((b: any) => ['pending', 'accepted', 'in-progress'].includes(b.status)).length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Completed</h3>
          <p className="text-3xl font-bold text-green-500">
            {bookings.filter((b: any) => b.status === 'completed').length}
          </p>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Bookings</h2>
        </div>
        <div className="p-6">
          {bookings.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No bookings yet. Start by browsing available fixers!
            </p>
          ) : (
            <div className="space-y-4">
              {bookings.slice(0, 5).map((booking: any) => (
                <div key={booking.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{booking.service}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {booking.fixerName} • {booking.scheduledDate}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                    booking.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    booking.status === 'accepted' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}