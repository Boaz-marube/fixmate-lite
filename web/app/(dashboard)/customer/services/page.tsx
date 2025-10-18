"use client";

import { useEffect, useState } from 'react';
import { apiClient } from '@/app/services/api-client.service';
import { Star, Clock, DollarSign } from 'lucide-react';

interface Service {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  duration: number;
  fixerId: {
    _id: string;
    name: string;
    rating: number;
    totalJobs: number;
  };
}

export default function BrowseServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchServices();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get<any>('/api/services/categories');
      setCategories(response.categories);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchServices = async () => {
    try {
      const query = selectedCategory ? `?category=${selectedCategory}` : '';
      const response = await apiClient.get<any>(`/api/services${query}`);
      setServices(response.services || []);
    } catch (error) {
      console.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading services...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Browse Services
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Find trusted fixers for your home repair needs
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === ''
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              {category.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No services found in this category.
            </p>
          </div>
        ) : (
          services.map((service) => (
            <div
              key={service._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {service.description}
                </p>
              </div>

              <div className="mb-4 space-y-2">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <DollarSign className="h-4 w-4 mr-2" />
                  KES {service.price.toLocaleString()}
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="h-4 w-4 mr-2" />
                  {service.duration} minutes
                </div>
              </div>

              {/* Fixer Info */}
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="font-medium text-gray-900 dark:text-white">
                  {service.fixerId.name}
                </p>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                    {service.fixerId.rating.toFixed(1)} ({service.fixerId.totalJobs} jobs)
                  </span>
                </div>
              </div>

              <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium">
                Book Now
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}