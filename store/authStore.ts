import { create } from 'zustand';
import axios from 'axios';
import { User, AuthCredentials } from '@/types/next-auth';
const API_URL = 'https://brandsquare-backend.onrender.com/api/v1';

interface VendorData {
  businessName: string;
  businessDescription: string;
  logo?: string;
  banner?: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  email: string;
  instagram: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  website: string;
  operatingHours: string;
  businessCategory: string;
  taxId: string;
}
  

const useAuthStore = create((set: any, get: any) => ({
  // State
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  updatedProfile: false,
  


  // Reset state
  resetState: () => {
    set({
      user: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,
    });
  },

  // Set loading state
  setLoading: (isLoading: any) => set({ isLoading }),
  
  // Set error state
  setError: (error: any) => set({ error }),

  // Register new user
  register: async (userData: User) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      set({ 
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false 
      });
      return response.data;
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Registration failed',
        isLoading: false 
      });
      throw error;
    }
  },
  updateUserDetails: async (userData: VendorData ) => {
    set({ isLoading: true, error: null, updatedProfile: false });
    try {
      // Send PATCH request to update the user data
      const response = await axios.patch(`${API_URL}/auth/update-business-profile`, userData, {
        headers: {
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      });

       
      
      // Update the state with the new user data returned from the API
      set({
        user: response.data.user,  // Assuming the updated user data is in response.data.user
        isAuthenticated: true,      // Assuming the user is still authenticated
        isLoading: false
      });
  
      // Optionally, return the updated user data
      return response.data;
    } catch (error: any) {
      // Handle errors and update the state
      set({
        error: error.response?.data?.message || 'Update failed',
        isLoading: false
      });
  
      // Optionally, throw error to be handled elsewhere
      throw error;
    }
  },
  

  // Login user
  login: async (credentials: AuthCredentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      const token = response.data.token;

      // Save the token to localStorage
      localStorage.setItem('token', token);
      
      set({ 
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false 
      });
      console.log(response.data, 'responsedata');
      return response.data;
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Login failed',
        isLoading: false 
      });
      throw error;
    }
  },

  // Send verification email
  sendVerificationEmail: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/send-verification-email`);
      set({ isLoading: false });
      return response.data;
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to send verification email',
        isLoading: false 
      });
      throw error;
    }
  },

  // Verify email
  verifyEmail: async (token:string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/verify-email/${token}`);
      set({ 
        user: { ...(get().user as User), emailVerified: true },
        isLoading: false 
      });
      return response.data;
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Email verification failed',
        isLoading: false 
      });
      throw error;
    }
  },

  // Forgot password
  forgotPassword: async (email: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
      set({ isLoading: false });
      return response.data;
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to process forgot password request',
        isLoading: false 
      });
      throw error;
    }
  },

  // Verify OTP
  verifyOTP: async (otp: any) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-otp`, { otp });
      set({ isLoading: false });
      return response.data;
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'OTP verification failed',
        isLoading: false 
      });
      throw error;
    }
  },

  // Reset password
  resetPassword: async (token:string, newPassword:string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.patch(`${API_URL}/reset-password/${token}`, {
        password: newPassword
      });
      set({ isLoading: false });
      return response.data;
    } catch (error:any) {
      set({ 
        error: error.response?.data?.message || 'Password reset failed',
        isLoading: false 
      });
      throw error;
    }
  },

  // Logout
  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      error: null
    });
  }
}));

export default useAuthStore;