package com.preporacaj.preporacaj_backend.repository;

import com.preporacaj.preporacaj_backend.model.Profile;
import com.preporacaj.preporacaj_backend.model.Recommendation;
import com.preporacaj.preporacaj_backend.model.enumeration.RecommendationCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RecommendationRepository extends JpaRepository<Recommendation, String> {
    Page<Recommendation> findAllByRecommendationCategory(RecommendationCategory recommendationCategory, Pageable pageable);
    Page<Recommendation> findAllByProfile(Profile profile, Pageable pageable);
}
