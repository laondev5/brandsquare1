import { create } from 'zustand';
import axios from 'axios';

interface Product {
  name: string;
  price: string;
  isFree: boolean;
  shortDescription: string;
  fullDescription: string;
  category: string;
  sizes: string[];
  colors: string[];
  inventory: { [key: string]: number };
  // displayImage: File | null;
  displayImage:  string;
  galleryImages: string[];
  coupons: { code: string; discount: number }[];
  id: string;
}

interface ProductState {
  products: Product[];
  currentProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchProducts: () => Promise<void>;
  fetchProductById: (id: string) => Promise<void>;
  createProduct: (productData: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, productData: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const API_URL = 'https://brandsquare-backend.onrender.com/api/v1/products';
//removed get
export const useProductStore = create<ProductState>((set) => ({
  products: [],
  currentProduct: null,
  isLoading: false,
  error: null,


  
  
  // Fetch all products
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(API_URL);
      set({ 
        products: response.data,
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
        products: [...state.products, newProduct],
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

  // createProduct = async (productData: any) => {
  //   // Get the token from wherever you're storing it (localStorage, context, etc.)
  //   const token = localStorage.getItem('token'); // or your preferred method of token storage
  
  //   try {
  //     const response = await axios.post(
  //       'http://localhost:5000/api/v1/products', 
  //       productData,
  //       {
  //         headers: {
  //           'Authorization': Bearer ${token},
  //           'Content-Type': 'application/json'
  //         }
  //       }
  //     );
  //     return response.data;
  //   } catch (error) {
  //     // Handle error
  //     console.error('Error creating product:', error);
  //     throw error;
  //   }
  // },

  // Update a product (Protected: ADMIN/VENDOR only)
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
        products: state.products.map(product => 
          product.id === id ? updatedProduct : product
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
        products: state.products.filter(product => product.id !== id),
        currentProduct: state.currentProduct?.id === id ? null : state.currentProduct,
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