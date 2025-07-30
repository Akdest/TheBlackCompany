const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

// Helper function to set auth token
const setAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
  }
};

// Helper function to remove auth token
const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
  }
};

// API request helper
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
};

// Auth API
export const authAPI = {
  signin: async (email: string, password: string) => {
    const response = await apiRequest('/users/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setAuthToken(response.token);
    return response;
  },

  register: async (userData: any) => {
    const response = await apiRequest('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    setAuthToken(response.token);
    return response;
  },

  signout: () => {
    removeAuthToken();
  },

  getCurrentUser: async () => {
    return await apiRequest('/users/profile');
  },
};

// Cart API
export const cartAPI = {
  getCart: async () => {
    const user = await authAPI.getCurrentUser();
    return user.cart || [];
  },

  addToCart: async (item: any) => {
    const user = await authAPI.getCurrentUser();
    const updatedCart = [...(user.cart || []), item];
    
    return await apiRequest(`/users/${user._id}`, {
      method: 'PUT',
      body: JSON.stringify({ cart: updatedCart }),
    });
  },

  updateCart: async (cart: any[]) => {
    const user = await authAPI.getCurrentUser();
    
    return await apiRequest(`/users/${user._id}`, {
      method: 'PUT',
      body: JSON.stringify({ cart }),
    });
  },

  removeFromCart: async (itemId: number) => {
    const user = await authAPI.getCurrentUser();
    const updatedCart = (user.cart || []).filter((item: any) => item.id !== itemId);
    
    return await apiRequest(`/users/${user._id}`, {
      method: 'PUT',
      body: JSON.stringify({ cart: updatedCart }),
    });
  },

  clearCart: async () => {
    const user = await authAPI.getCurrentUser();
    
    return await apiRequest(`/users/${user._id}`, {
      method: 'PUT',
      body: JSON.stringify({ cart: [] }),
    });
  },
};

// Wishlist API
export const wishlistAPI = {
  getWishlist: async () => {
    const user = await authAPI.getCurrentUser();
    return user.wishlist || [];
  },

  addToWishlist: async (item: any) => {
    const user = await authAPI.getCurrentUser();
    const updatedWishlist = [...(user.wishlist || []), item];
    
    return await apiRequest(`/users/${user._id}`, {
      method: 'PUT',
      body: JSON.stringify({ wishlist: updatedWishlist }),
    });
  },

  removeFromWishlist: async (itemId: number) => {
    const user = await authAPI.getCurrentUser();
    const updatedWishlist = (user.wishlist || []).filter((item: any) => item.id !== itemId);
    
    return await apiRequest(`/users/${user._id}`, {
      method: 'PUT',
      body: JSON.stringify({ wishlist: updatedWishlist }),
    });
  },

  clearWishlist: async () => {
    const user = await authAPI.getCurrentUser();
    
    return await apiRequest(`/users/${user._id}`, {
      method: 'PUT',
      body: JSON.stringify({ wishlist: [] }),
    });
  },
};

// Products API
export const productsAPI = {
  getAllProducts: async () => {
    return await apiRequest('/products');
  },

  getProduct: async (id: string) => {
    return await apiRequest(`/products/${id}`);
  },

  getProductsByCategory: async (category: string) => {
    return await apiRequest(`/products?category=${category}`);
  },

  searchProducts: async (keyword: string) => {
    return await apiRequest(`/products?searchKeyword=${keyword}`);
  },
};

// Orders API
export const ordersAPI = {
  createOrder: async (orderData: any) => {
    return await apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  getUserOrders: async () => {
    return await apiRequest('/orders/mine');
  },

  getOrder: async (id: string) => {
    return await apiRequest(`/orders/${id}`);
  },
};

export default {
  auth: authAPI,
  cart: cartAPI,
  wishlist: wishlistAPI,
  products: productsAPI,
  orders: ordersAPI,
}; 