import axios, { AxiosInstance } from "axios";
import { axiosInit } from "./axiosInit";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_TOCH_ADMIN_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const token = localStorage.getItem("token") as string;

if (token) {
  axiosInit(token)
}