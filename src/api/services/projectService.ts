 import api from "../axios";
import { ENDPOINTS } from "../endpoints";

export const getProjects = async () => {
  const response = await api.get(ENDPOINTS.PROJECTS);
  return response.data;
};

export const getProjectById = async (slug: string) => {
  const response = await api.get(`${ENDPOINTS.PROJECTS}/${slug}`);
  return response.data;
};