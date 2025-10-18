"use client";

import { useAuth } from '@/app/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { fixerService } from '@/app/services/fixer.service';

export default function FixerDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    totalJobs: 0,
    pendingJobs: 0,
    completedJobs: 0,
    totalEarnings: 0,
    averageRating: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        const [userBookings, userStats] = await Promise.all([
          fixerService.getBookings(user.id),
          fixerService.getStats(user.id)
        ]);
        
        setBookings(userBookings);
        if (userStats) setStats(userStats);
      }
      setLoading(false);
    };

    fetchData();
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
          Manage your services and job requests
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Jobs</h3>
          <p className="text-3xl font-bold text-orange-500">{stats.totalJobs}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pending</h3>
          <p className="text-3xl font-bold text-yellow-500">{stats.pendingJobs}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Completed</h3>
          <p className="text-3xl font-bold text-green-500">{stats.completedJobs}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Rating</h3>
          <p className="text-3xl font-bold text-blue-500">{(stats.averageRating || 0).toFixed(1)}</p>
        </div>
      </div>

      {/* Recent Job Requests */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Job Requests</h2>
        </div>
        <div className="p-6">
          {bookings.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No job requests yet. Make sure your services are active!
            </p>
          ) : (
            <div className="space-y-4">
              {bookings.slice(0, 5).map((booking: any) => (
                <div key={booking.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{booking.service}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {booking.customerName} • {booking.scheduledDate} at {booking.scheduledTime}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {booking.customerAddress}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      booking.status === 'accepted' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {booking.status}
                    </span>
                    {booking.status === 'pending' && (
                      <button
                        onClick={() => fixerService.acceptBooking(booking.id)}
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                      >
                        Accept
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}