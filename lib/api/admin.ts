// Admin API service
import axiosInstance from './axios';
import { API } from './endpoints';

export interface User {
  _id: string;
  fullName: string;
  email: string;
  role: 'user' | 'admin';
  phoneNumber?: string;
  shoppingPreference?: string;
  profilePicture?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface UsersResponse {
  success: boolean;
  data: User[];
  pagination: PaginationInfo;
  message?: string;
}

export interface UserResponse {
  success: boolean;
  data: User;
  message?: string;
}

export interface AdminQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
}

const isAuthError = (error: any): boolean => {
  const status = error?.status;
  return status === 401 || status === 403;
};

const buildUsersFailure = (message: string): UsersResponse => ({
  success: false,
  data: [],
  pagination: {
    page: 1,
    limit: 0,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  },
  message,
});

// Get all users with pagination
export const getAdminUsers = async (params: AdminQueryParams = {}): Promise<UsersResponse> => {
  try {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.role) queryParams.append('role', params.role);

    const url = `${API.ADMIN.USERS.GET_ALL}?${queryParams.toString()}`;
    const response = await axiosInstance.get<UsersResponse>(url);
    return response.data;
  } catch (error: any) {
    if (isAuthError(error)) {
      return buildUsersFailure(error.message || 'Unauthorized');
    }
    throw new Error(error.message || 'Failed to fetch users');
  }
};

// Get user by ID
export const getAdminUserById = async (id: string): Promise<UserResponse> => {
  try {
    const response = await axiosInstance.get<UserResponse>(API.ADMIN.USERS.GET_BY_ID(id));
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch user');
  }
};

// Create user (with FormData for image upload)
export const createAdminUser = async (formData: FormData): Promise<UserResponse> => {
  try {
    const response = await axiosInstance.post<UserResponse>(API.ADMIN.USERS.CREATE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create user');
  }
};

// Update user (with FormData for image upload)
export const updateAdminUser = async (id: string, formData: FormData): Promise<UserResponse> => {
  try {
    const response = await axiosInstance.put<UserResponse>(API.ADMIN.USERS.UPDATE(id), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update user');
  }
};

// Delete user
export const deleteAdminUser = async (id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axiosInstance.delete(API.ADMIN.USERS.DELETE(id));
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete user');
  }
};

// Update user profile (with FormData for image upload)
export const updateUserProfile = async (id: string, formData: FormData): Promise<UserResponse> => {
  try {
    const response = await axiosInstance.put<UserResponse>(API.AUTH.UPDATE_BY_ID(id), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update profile');
  }
};

// Get dashboard stats
export const getDashboardStats = async () => {
  try {
    const response = await axiosInstance.get(API.ADMIN.DASHBOARD);
    return response.data;
  } catch (error: any) {
    if (isAuthError(error)) {
      return { success: false, data: null, message: error.message || 'Unauthorized' };
    }
    throw new Error(error.message || 'Failed to fetch dashboard stats');
  }
};

// Get recent users for dashboard
export const getRecentUsers = async (limit: number = 5): Promise<UsersResponse> => {
  try {
    const response = await axiosInstance.get(`${API.ADMIN.USERS.GET_ALL}?limit=${limit}&page=1`);
    return response.data;
  } catch (error: any) {
    if (isAuthError(error)) {
      return buildUsersFailure(error.message || 'Unauthorized');
    }
    throw new Error(error.message || 'Failed to fetch recent users');
  }
};

// Product interfaces
export interface AdminProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  tags?: string[];
  discount?: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  success: boolean;
  data: AdminProduct[];
  message?: string;
}

export interface ProductResponse {
  success: boolean;
  data: AdminProduct;
  message?: string;
}

// Get all products
export const getAdminProducts = async (): Promise<ProductsResponse> => {
  try {
    const response = await axiosInstance.get(API.ADMIN.PRODUCTS.GET_ALL);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch products');
  }
};

// Create product (with FormData for image upload)
export const createAdminProduct = async (formData: FormData): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.post<ProductResponse>(API.ADMIN.PRODUCTS.CREATE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create product');
  }
};

// Update product (with FormData for image upload)
export const updateAdminProduct = async (id: string, formData: FormData): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.put<ProductResponse>(API.ADMIN.PRODUCTS.UPDATE(id), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update product');
  }
};

// Delete product
export const deleteAdminProduct = async (id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axiosInstance.delete(API.ADMIN.PRODUCTS.DELETE(id));
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete product');
  }
};

// Order interfaces
export interface AdminOrderItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}

export interface AdminOrder {
  _id: string;
  userId: {
    _id: string;
    name?: string;
    fullName?: string;
    email?: string;
  };
  items: AdminOrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'outForDelivery' | 'delivered' | 'cancelled' | 'refunded';
  paymentMethod: {
    id: string;
    type: string;
    last4: string;
  };
  shippingAddress: {
    id: string;
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  tracking: Array<{
    status: string;
    description: string;
    timestamp: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface OrdersResponse {
  success: boolean;
  data: AdminOrder[];
  message?: string;
}

// Get all orders
export const getAdminOrders = async (): Promise<OrdersResponse> => {
  try {
    const response = await axiosInstance.get(API.ADMIN.ORDERS.GET_ALL);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch orders');
  }
};

// Update order status
export const updateAdminOrderStatus = async (orderId: string, status: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axiosInstance.patch(API.ADMIN.ORDERS.UPDATE_STATUS(orderId), { status });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update order status');
  }
};

// Get single order by ID
export const getAdminOrderById = async (orderId: string): Promise<{ success: boolean; data: AdminOrder; message?: string }> => {
  try {
    const response = await axiosInstance.get(API.ADMIN.ORDERS.GET_BY_ID(orderId));
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch order details');
  }
};

// Delivery Driver interfaces
export interface DeliveryDriver {
  _id: string;
  name: string;
  phone: string;
  email: string;
  vehicleNumber: string;
  isActive: boolean;
  avatarUrl?: string;
  createdAt: string;
}

// Get all delivery drivers
export const getDeliveryDrivers = async (): Promise<DeliveryDriver[]> => {
  try {
    const response = await axiosInstance.get(API.DRIVERS.GET_ALL);
    return response.data.data || response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch drivers');
  }
};

// Assign a delivery driver to an order
export const assignDriverToOrder = async (orderId: string, driverId: string): Promise<{ success: boolean; data: AdminOrder; message?: string }> => {
  try {
    const response = await axiosInstance.patch(API.ADMIN.ORDERS.ASSIGN_DRIVER(orderId), { driverId });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to assign driver');
  }
};
