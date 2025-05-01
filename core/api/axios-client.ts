import axios from "axios";
import useAuthStore from "../store/auth.store";
import Constants from "expo-constants";

const axiosClient = axios.create({
  baseURL: Constants.expoConfig?.extra?.apiBackendUrl ?? "",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const { session } = useAuthStore.getState();
    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    Promise.reject(error);
  }
);

export default axiosClient;
