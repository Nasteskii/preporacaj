import apiRequestService from "./apiRequest.service";

export const fetchCommentsByRecommendationId = async (
  recommendationId: string,
) => {
  try {
    return await apiRequestService.get(
      `/api/comments/public/${recommendationId}`,
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const addComment = async (recommendationId: string, commentDTO: any) => {
  try {
    return await apiRequestService.post(
      `/api/comments/${recommendationId}/add`,
      commentDTO,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      },
    );
  } catch (error) {
    console.error("Error adding comment:", error);
  }
};

export const editComment = async (
  recommendationId: string,
  commentDTO: any,
  commentId?: string,
) => {
  try {
    return await apiRequestService.post(
      `/api/comments/${recommendationId}/edit/${commentId}`,
      commentDTO,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      },
    );
  } catch (error) {
    console.error("Error editing comment:", error);
  }
};

export const deleteComment = async (commentId?: string) => {
  try {
    return await apiRequestService.delete(`/api/comments/delete/${commentId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
};
