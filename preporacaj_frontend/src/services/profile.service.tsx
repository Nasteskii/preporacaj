import apiRequestService from "./apiRequest.service";
import { Profile } from "../types/Profile";

export const fetchProfileInfo = async (): Promise<Profile | null> => {
  try {
    const response = await apiRequestService.get("/api/profiles/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
