package com.preporacaj.preporacaj_backend.service.impl;

import com.preporacaj.preporacaj_backend.model.Profile;
import com.preporacaj.preporacaj_backend.model.Recommendation;
import com.preporacaj.preporacaj_backend.model.enumeration.RecommendationCategory;
import com.preporacaj.preporacaj_backend.model.enumeration.Status;
import com.preporacaj.preporacaj_backend.repository.ProfileRepository;
import com.preporacaj.preporacaj_backend.repository.RecommendationRepository;
import com.preporacaj.preporacaj_backend.service.RecommendationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class RecommendationServiceImpl implements RecommendationService {
    private final RecommendationRepository recommendationRepository;
    private final ProfileRepository profileRepository;

    @Override
    public List<Recommendation> getAll() {
        return recommendationRepository.findAll();
    }

    @Override
    public Recommendation addRecommendation(String title, String recommendationContent, RecommendationCategory category, String profileId) {
        Profile profile = profileRepository.findById(profileId).orElseThrow(NoSuchElementException::new);
        Recommendation newRecommendation = new Recommendation();
        newRecommendation.setTitle(title);
        newRecommendation.setRecommendationContent(recommendationContent);
        newRecommendation.setRecommendationCategory(category);
        newRecommendation.setRating("Not rated");
        newRecommendation.setRatings(0);
        newRecommendation.setProfile(profile);
        return recommendationRepository.save(newRecommendation);
    }

    @Override
    public Recommendation editRecommendation(String recommendationId, String title, String recommendationContent, RecommendationCategory category, String profileId) {
        Recommendation oldRecommendation = recommendationRepository.findById(recommendationId).orElseThrow(NoSuchElementException::new);
        Profile profile = profileRepository.findById(profileId).orElseThrow(NoSuchElementException::new);
        oldRecommendation.setTitle(title);
        oldRecommendation.setRecommendationContent(recommendationContent);
        oldRecommendation.setRecommendationCategory(category);
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
        recommendation.setRating(String.valueOf((oldRating * recommendation.getRatings() + newRating) / (recommendation.getRatings() + 1)));
        recommendation.setRatings(recommendation.getRatings() + 1);
    }
}
