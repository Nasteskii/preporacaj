package com.preporacaj.preporacaj_backend.repository;

import com.preporacaj.preporacaj_backend.model.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecommendationRepository extends JpaRepository<Recommendation, String> {
}
