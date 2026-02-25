// API layer for products
import axiosInstance from './axios';
import { API } from './endpoints';

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number; // This will be the price in user's currency
    category: string;
    subcategory?: string;
    images: string[];
    tags?: string[];
    sizes?: string[];
    colors?: string[];
    discount?: number;
    rating?: number;
    reviews?: number;
    stock: number;
    isActive?: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ProductFilters {
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    tags?: string[];
    country?: string; // Add country filter
}

export const getProducts = async (filters?: ProductFilters): Promise<Product[]> => {
    try {
        const params = new URLSearchParams();
        if (filters?.category) params.append('category', filters.category);
        if (filters?.search) params.append('search', filters.search);
        if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
        if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
        if (filters?.tags) filters.tags.forEach(tag => params.append('tags', tag));
        if (filters?.country) params.append('country', filters.country);

        const response = await axiosInstance.get(`${API.PRODUCTS.GET_ALL}?${params}`);
        return response.data.data || response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getProductById = async (id: string): Promise<Product> => {
    try {
        const response = await axiosInstance.get(API.PRODUCTS.GET_BY_ID(id));
        return response.data.data || response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};

export const getCategories = async (): Promise<string[]> => {
    try {
        const response = await axiosInstance.get('/api/products/categories');
        return response.data.data || response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
    try {
        const response = await axiosInstance.get(`/api/products/category/${category}`);
        return response.data.data || response.data;
    } catch (error) {
        console.error('Error fetching products by category:', error);
        throw error;
    }
};

export const getPersonalizedProducts = async (limit?: number): Promise<Product[]> => {
    try {
        const params = new URLSearchParams();
        if (limit) params.append('limit', limit.toString());

        const response = await axiosInstance.get(`${API.PRODUCTS.PERSONALIZED}?${params}`);
        return response.data.data || response.data;
    } catch (error) {
        console.error('Error fetching personalized products:', error);
        throw error;
    }
};