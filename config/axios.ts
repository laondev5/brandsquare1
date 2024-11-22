import axios from "axios";

// Define the base URL for the API
const BASE_URL = "http://localhost:5000/api/v1";
  
// Default axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Authenticated axios instance
const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export { axiosInstance, axiosAuth };