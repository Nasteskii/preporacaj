import apiRequestService from "./apiRequest.service";

export const fetchRecommendationById = async (recommendationId: string) => {
  try {
    return await apiRequestService.get(
      `/api/recommendations/public/${recommendationId}`,
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchRecommendationsByProfileId = async (profileId: string) => {
  try {
    return await apiRequestService.get(
      `/api/recommendations/public/profile/${profileId}`,
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchRecommendationsByCategory = async (category: string) => {
  try {
    return await apiRequestService.get(
      `/api/recommendations/public/category/${category}`,
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const addRecommendation = async (recommendationDTO: any) => {
  try {
    await apiRequestService.post(
      "/api/recommendations/add",
      recommendationDTO,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      },
    );
  } catch (error) {
    console.error("Error adding recommendation:", error);
  }
};

export const editRecommendation = async (
  recommendationId: string,
  recommendationDTO: any,
) => {
  try {
    await apiRequestService.post(
      `/api/recommendations/edit/${recommendationId}`,
      recommendationDTO,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      },
    );
  } catch (error) {
    console.error("Error editing recommendation:", error);
  }
};

export const deleteRecommendation = async (recommendationId: string) => {
  try {
    await apiRequestService.delete(
      `/api/recommendations/delete/${recommendationId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      },
    );
  } catch (error) {
    console.error("Error deleting recommendation:", error);
  }
};

export const changeStatus = async (
  recommendationId: string,
  status: string,
) => {
  try {
    await apiRequestService.get(
      `/api/recommendations/status/${recommendationId}/${status}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      },
    );
  } catch (error) {
    console.error("Error changing recommendation status:", error);
  }
};

export const changeRating = async (
  recommendationId: string,
  newRating: Int8Array,
  ratingType: string,
) => {
  let ratingPath;
  switch (ratingType) {
    case "availability":
      ratingPath = "availabilityRating";
      break;
    case "reliability":
      ratingPath = "reliabilityRating";
      break;
    case "price":
      ratingPath = "priceRating";
      break;
  }
  try {
    await apiRequestService.get(
      `/api/recommendations/public/${ratingPath}/${recommendationId}/${newRating}`,
    );
  } catch (error) {
    console.error("Error changing availability rating:", error);
  }
};
