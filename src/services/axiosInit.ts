import { axiosInstance } from "./axiosInstance";

/**
 * Sets an item to the browsers localStorage
 * @param token - JWT to be set in Authorization headers
 * @returns 
 */
export function axiosInit(token: string) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}