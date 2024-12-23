import { axiosInstance } from "@/services/axiosInstance";
import { DRIVER_API } from "@/constants/api";
import { FetchDriversQuery } from "@/types/drivers";
import { createQueryString } from "@/utils/createQuery";

export const getDrivers = async (query: FetchDriversQuery) => {
  const res = await axiosInstance.get(`${DRIVER_API}${createQueryString(query)}`);
  return res.data;
};

export const getDriver = async (id: string) => {
  const res = await axiosInstance.get(`${DRIVER_API}/${id}`);
  return res.data;
};