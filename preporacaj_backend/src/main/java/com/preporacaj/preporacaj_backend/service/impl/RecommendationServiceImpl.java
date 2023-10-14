package com.preporacaj.preporacaj_backend.service.impl;

import com.preporacaj.preporacaj_backend.model.Profile;
import com.preporacaj.preporacaj_backend.model.Recommendation;
import com.preporacaj.preporacaj_backend.model.enumeration.RecommendationCategory;
import com.preporacaj.preporacaj_backend.model.enumeration.Status;
import com.preporacaj.preporacaj_backend.repository.ProfileRepository;
import com.preporacaj.preporacaj_backend.repository.RecommendationRepository;
import com.preporacaj.preporacaj_backend.service.RecommendationService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class RecommendationServiceImpl implements RecommendationService {
    private final RecommendationRepository recommendationRepository;
    private final ProfileRepository profileRepository;

    @Override
    public Page<Recommendation> getAll(Pageable pageable) {
        return recommendationRepository.findAll(pageable);
    }

    @Override
    public Recommendation getByRecommendationId(String recommendationId) {
        return recommendationRepository.findById(recommendationId).orElseThrow(NoSuchElementException::new);
    }

    @Override
    public Page<Recommendation> getByCategory(RecommendationCategory recommendationCategory, Pageable pageable) {
        return recommendationRepository.findAllByRecommendationCategory(recommendationCategory, pageable);
    }

    @Override
    public Page<Recommendation> getByProfileId(String profileId, Pageable pageable) {
        Profile profile = profileRepository.findById(profileId).orElseThrow(NoSuchElementException::new);
        return recommendationRepository.findAllByProfile(profile, pageable);
    }

    @Override
    public Recommendation addRecommendation(String title, String recommendationContent, RecommendationCategory recommendationCategory, String profileId) {
        Profile profile = profileRepository.findById(profileId).orElseThrow(NoSuchElementException::new);
        Recommendation newRecommendation = new Recommendation();
        newRecommendation.setTitle(title);
        newRecommendation.setRecommendationContent(recommendationContent);
        newRecommendation.setRecommendationCategory(recommendationCategory);
        newRecommendation.setStatus(Status.ACTIVE);
        newRecommendation.setRating("Not rated");
        newRecommendation.setRatings(0);
        newRecommendation.setProfile(profile);
        return recommendationRepository.save(newRecommendation);
    }

    @Override
    public Recommendation editRecommendation(String recommendationId, String title, String recommendationContent, RecommendationCategory recommendationCategory, String profileId) {
        Recommendation oldRecommendation = recommendationRepository.findById(recommendationId).orElseThrow(NoSuchElementException::new);
        Profile profile = profileRepository.findById(profileId).orElseThrow(NoSuchElementException::new);
        oldRecommendation.setTitle(title);
        oldRecommendation.setRecommendationContent(recommendationContent);
        oldRecommendation.setRecommendationCategory(recommendationCategory);
        oldRecommendation.setProfile(profile);
        return recommendationRepository.save(oldRecommendation);
    }

    @Override
    public Recommendation removeRecommendation(String recommendationId) {
        Recommendation recommendation = recommendationRepository.findById(recommendationId).orElseThrow(NoSuchElementException::new);
        recommendationRepository.delete(recommendation);
        return recommendation;
    }

    @Override
    public void changeStatus(String recommendationId, Status status) {
        Recommendation recommendation = recommendationRepository.findById(recommendationId).orElseThrow(NoSuchElementException::new);
        recommendation.setStatus(status);
    }

    @Override
    public void updateRating(String recommendationId, double newRating) {
        Recommendation recommendation = recommendationRepository.findById(recommendationId).orElseThrow(NoSuchElementException::new);
        double oldRating = recommendation.getRatings() > 0 ? Double.parseDouble(recommendation.getRating()) : 0;
        recommendation.setRating(String.format("%.2f",(oldRating * recommendation.getRatings() + newRating) / (recommendation.getRatings() + 1)));
        recommendation.setRatings(recommendation.getRatings() + 1);
        recommendationRepository.save(recommendation);
    }
}
