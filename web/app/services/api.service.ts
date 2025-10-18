const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8091';

class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const config: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      };

      // Add auth token if available
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${token}`,
          };
        }
      }

      const response = await fetch(url, config);
      const data = await response.json();
      
      // Backend returns success field, check that instead of HTTP status
      if (!data.success) {
        console.error('API Error Response:', data.message);
        throw new Error(data.message || `Request failed: ${response.status}`);
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  async get(endpoint: string) {
    return this.request(endpoint, { method: 'GET' });
  }

  async post(endpoint: string, data?: any) {
    return this.request(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch(endpoint: string, data?: any) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put(endpoint: string, data?: any) {
    return this.request(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete(endpoint: string) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

export const apiService = new ApiService();