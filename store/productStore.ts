import { create } from 'zustand';
import axios from 'axios';

import { Product } from '@/app/utility/products';

// interface Product {
//   name: string;
//   price: string;
//   isFree: boolean;
//   shortDescription: string;
//   fullDescription: string;
//   category: string;
//   sizes: string[];
//   colors: string[];
//   inventory: { [key: string]: number };
//   displayImage:  string;
//   galleryImages: string[];
//   coupons: { code: string; discount: number }[];
//   id: string;
// }

interface ProductState {
  allProducts: Product[];
  currentProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchProducts: () => Promise<void>;
  fetchProductsByAdmin: () => Promise<void>;
  fetchProductsByUsers: () => Promise<void>;
  fetchProductById: (id: string) => Promise<void>;
  createProduct: (productData: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, productData: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const API_URL ='https://brandsquare-backend.onrender.com/api/v1/products';
//removed get
export const useProductStore = create<ProductState>((set) => ({
  allProducts: [],
  currentProduct: null,
  isLoading: false,
  error: null,


  
  
  // Fetch all products
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(API_URL)
      set({ 
        allProducts: response.data,
        isLoading: false 
      });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch products',
        isLoading: false 
      });
    }
  },
  fetchProductsByAdmin: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/admin-products`, { 
        headers: {
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      });
      set({ 
        allProducts: response.data,
        isLoading: false 
      });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch products',
        isLoading: false 
      });
    }
  },
  fetchProductsByUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/vendor-products`, { 
        headers: {
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      });
      set({ 
        allProducts: response.data,
        isLoading: false 
      });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch products',
        isLoading: false 
      });
    }
  },

  // Fetch a specific product
  fetchProductById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      set({ 
        currentProduct: response.data,
        isLoading: false 
      });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch product',
        isLoading: false 
      });
    }
  },

  // Create a new product (Protected: ADMIN/VENDOR only)
  createProduct: async (productData: Omit<Product, 'id'>) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(API_URL, productData, {
        headers: {
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const newProduct = response.data;
      set(state => ({ 
        allProducts: [...state.allProducts, newProduct],
        isLoading: false 
      }));
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to create product',
        isLoading: false 
      });
      throw error;
    }
  },


  updateProduct: async (id: string, productData: Partial<Product>) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.patch(`${API_URL}/${id}`, productData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const updatedProduct = response.data;
      set(state => ({
        products: state.allProducts.map(product => 
          product._id === id ? updatedProduct : product
        ),
        currentProduct: updatedProduct,
        isLoading: false
      }));
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to update product',
        isLoading: false 
      });
      throw error;
    }
  },

  // Delete a product (Protected: ADMIN/VENDOR only)
  deleteProduct: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      set(state => ({
        products: state.allProducts.filter(product => product._id.toString() !== id),
        currentProduct: state.currentProduct?._id === id ? null : state.currentProduct,
        isLoading: false
      }));
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to delete product',
        isLoading: false 
      });
      throw error;
    }
  }
}));