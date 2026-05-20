import api from "../axios";
import { ENDPOINTS } from "../endpoints";

export const postFormData = async (data: any) => {
  const response = await api.post(ENDPOINTS.ENQUIRIES, data);
  return response.data;
};