import api from "../axios";
import { ENDPOINTS } from "../endpoints";

export const getHomeData = async () => {
  const response = await api.get(ENDPOINTS.HOME);
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get(ENDPOINTS.CATEGORIES); // add CATEGORIES to your endpoints
  return response.data;
};

export const getCities = async () => {
  const response = await api.get(ENDPOINTS.CITIES); // add CITIES to your endpoints
  return response.data;
};

export const getTestimonials = async () => {
  const response = await api.get(ENDPOINTS.TESTIMONIALS);
  return response.data;
};

