import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const baseURL: string = "https://localhost:7149/api";
const timeOut: number = 120000;

export const instance = axios.create({
  baseURL: baseURL,
  timeout: timeOut,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

delete instance.defaults.headers.common["X-Requested-With"];

instance.interceptors.request.use(function (config) {
  const authStore = useAuthStore();
  config.headers.Authorization = `Bearer ${authStore.$state.accessToken}`;
  return config;
});
