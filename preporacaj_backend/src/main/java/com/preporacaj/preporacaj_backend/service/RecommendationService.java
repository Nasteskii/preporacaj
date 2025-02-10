package com.preporacaj.preporacaj_backend.service;

import com.preporacaj.preporacaj_backend.model.Recommendation;
import com.preporacaj.preporacaj_backend.model.dto.RecommendationDto;
import com.preporacaj.preporacaj_backend.model.enumeration.RecommendationCategory;
import com.preporacaj.preporacaj_backend.model.enumeration.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RecommendationService {
    Page<Recommendation> getAll(Pageable pageable);
    Recommendation getByRecommendationId(String recommendationId);
    Page<Recommendation> getByCategory(RecommendationCategory recommendationCategory, Pageable pageable);
    Page<Recommendation> getByProfileId(String profileId, Pageable pageable);
    Recommendation addRecommendation(RecommendationDto recommendationDto);
    Recommendation editRecommendation(String recommendationId, RecommendationDto recommendationDto);
    Recommendation removeRecommendation(String recommendationId);
    void changeStatus(String recommendationId, Status status);
    void updateRating(String recommendationId, double newRating);
}
