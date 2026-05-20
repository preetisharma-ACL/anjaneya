import api from "../axios";
import { ENDPOINTS } from "../endpoints";

export const getTeamData = async () => {
  const response = await api.get(ENDPOINTS.TEAM);
  return response.data;
};