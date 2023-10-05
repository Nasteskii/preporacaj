package com.preporacaj.preporacaj_backend.service;

import com.preporacaj.preporacaj_backend.model.Recommendation;
import com.preporacaj.preporacaj_backend.model.enumeration.RecommendationCategory;
import com.preporacaj.preporacaj_backend.model.enumeration.Status;

import java.util.List;

public interface RecommendationService {
    List<Recommendation> getAll();
    Recommendation addRecommendation(String title, String recommendationContent, RecommendationCategory category, String profileId);
    Recommendation editRecommendation(String recommendationId, String title, String recommendationContent, RecommendationCategory category, String profileId);
    Recommendation removeRecommendation(String recommendationId);
    void changeStatus(String recommendationId, Status status);
    void updateRating(String recommendationId, double newRating);
}
