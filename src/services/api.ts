const API_BASE_URL = "http://localhost:5000/api";

/* ===================== TYPES ===================== */

export interface CartItem {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
}

export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  isAdmin: boolean;
  cart: CartItem[];
  wishlist: CartItem[];
  contactnumber: string;
}

export interface RegisterPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  contactnumber: string;
}

export interface OrderPayload {
  items: CartItem[];
  totalPrice: number;
  shippingAddress: unknown;
  paymentMethod: string;
}

/* ===================== TOKEN HELPERS ===================== */

const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

const setAuthToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("authToken", token);
  }
};

const removeAuthToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
  }
};

/* ===================== API REQUEST ===================== */

const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getAuthToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
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

  return response.json() as Promise<T>;
};

/* ===================== AUTH API ===================== */

export const authAPI = {
  signin: async (email: string, password: string): Promise<User & { token: string }> => {
    const response = await apiRequest<User & { token: string }>("/users/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    setAuthToken(response.token);
    return response;
  },

  register: async (userData: RegisterPayload): Promise<User & { token: string }> => {
    const response = await apiRequest<User & { token: string }>("/users/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });

    setAuthToken(response.token);
    return response;
  },

  signout: (): void => {
    removeAuthToken();
  },

  getCurrentUser: async (): Promise<User> => {
    return await apiRequest<User>("/users/profile");
  },
};

/* ===================== CART API ===================== */

export const cartAPI = {
  getCart: async (): Promise<CartItem[]> => {
    const user = await authAPI.getCurrentUser();
    return user.cart || [];
  },

  addToCart: async (item: CartItem): Promise<User> => {
    const user = await authAPI.getCurrentUser();
    const updatedCart: CartItem[] = [...(user.cart || []), item];

    return await apiRequest<User>(`/users/${user._id}`, {
      method: "PUT",
      body: JSON.stringify({ cart: updatedCart }),
    });
  },

  updateCart: async (cart: CartItem[]): Promise<User> => {
    const user = await authAPI.getCurrentUser();

    return await apiRequest<User>(`/users/${user._id}`, {
      method: "PUT",
      body: JSON.stringify({ cart }),
    });
  },

  removeFromCart: async (itemId: number): Promise<User> => {
    const user = await authAPI.getCurrentUser();
    const updatedCart: CartItem[] = (user.cart || []).filter(
      (item) => item.id !== itemId
    );

    return await apiRequest<User>(`/users/${user._id}`, {
      method: "PUT",
      body: JSON.stringify({ cart: updatedCart }),
    });
  },

  clearCart: async (): Promise<User> => {
    const user = await authAPI.getCurrentUser();

    return await apiRequest<User>(`/users/${user._id}`, {
      method: "PUT",
      body: JSON.stringify({ cart: [] }),
    });
  },
};

/* ===================== WISHLIST API ===================== */

export const wishlistAPI = {
  getWishlist: async (): Promise<CartItem[]> => {
    const user = await authAPI.getCurrentUser();
    return user.wishlist || [];
  },

  addToWishlist: async (item: CartItem): Promise<User> => {
    const user = await authAPI.getCurrentUser();
    const updatedWishlist: CartItem[] = [...(user.wishlist || []), item];

    return await apiRequest<User>(`/users/${user._id}`, {
      method: "PUT",
      body: JSON.stringify({ wishlist: updatedWishlist }),
    });
  },

  removeFromWishlist: async (itemId: number): Promise<User> => {
    const user = await authAPI.getCurrentUser();
    const updatedWishlist: CartItem[] = (user.wishlist || []).filter(
      (item) => item.id !== itemId
    );

    return await apiRequest<User>(`/users/${user._id}`, {
      method: "PUT",
      body: JSON.stringify({ wishlist: updatedWishlist }),
    });
  },

  clearWishlist: async (): Promise<User> => {
    const user = await authAPI.getCurrentUser();

    return await apiRequest<User>(`/users/${user._id}`, {
      method: "PUT",
      body: JSON.stringify({ wishlist: [] }),
    });
  },
};

/* ===================== PRODUCTS API ===================== */

export const productsAPI = {
  getAllProducts: async (): Promise<unknown[]> => {
    return await apiRequest<unknown[]>("/products");
  },

  getProduct: async (id: string): Promise<unknown> => {
    return await apiRequest<unknown>(`/products/${id}`);
  },

  getProductsByCategory: async (category: string): Promise<unknown[]> => {
    return await apiRequest<unknown[]>(`/products?category=${category}`);
  },

  searchProducts: async (keyword: string): Promise<unknown[]> => {
    return await apiRequest<unknown[]>(`/products?searchKeyword=${keyword}`);
  },
};

/* ===================== ORDERS API ===================== */

export const ordersAPI = {
  createOrder: async (orderData: OrderPayload): Promise<unknown> => {
    return await apiRequest<unknown>("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  },

  getUserOrders: async (): Promise<unknown[]> => {
    return await apiRequest<unknown[]>("/orders/mine");
  },

  getOrder: async (id: string): Promise<unknown> => {
    return await apiRequest<unknown>(`/orders/${id}`);
  },
};

/* ===================== EXPORT ===================== */

export default {
  auth: authAPI,
  cart: cartAPI,
  wishlist: wishlistAPI,
  products: productsAPI,
  orders: ordersAPI,
};
