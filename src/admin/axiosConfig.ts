import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// Define the base URL from environment variables
const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000, // Set timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): InternalAxiosRequestConfig => {
    // Add an Authorization token if it exists
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config as InternalAxiosRequestConfig; // Type assertion to avoid type error
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token refresh here
      // For example, call a refresh token API and store the new token

      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const refreshResponse = await axios.post("/auth/refresh", {
            refreshToken,
          });
          const newToken = refreshResponse.data.accessToken;
          localStorage.setItem("authToken", newToken); // Update the token

          // Retry the original request with the new token
          error.config.headers["Authorization"] = `Bearer ${newToken}`;
          return axios(error.config);
        } catch (refreshError) {
          // Handle refresh token failure (logout the user or redirect to login)
          console.log("Refresh token failed", refreshError);
          // Optionally redirect to login page
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
