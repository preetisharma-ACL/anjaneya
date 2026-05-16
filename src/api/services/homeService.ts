import api from "../axios";
import { ENDPOINTS } from "../endpoints";

export const getHomeData = async () => {
  const response = await api.get(ENDPOINTS.HOME);
  return response.data;
};