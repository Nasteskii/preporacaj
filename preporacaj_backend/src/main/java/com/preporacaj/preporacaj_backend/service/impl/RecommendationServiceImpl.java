package com.preporacaj.preporacaj_backend.service.impl;

import com.preporacaj.preporacaj_backend.model.Profile;
import com.preporacaj.preporacaj_backend.model.Recommendation;
import com.preporacaj.preporacaj_backend.model.dto.RecommendationDto;
import com.preporacaj.preporacaj_backend.model.enumeration.RecommendationCategory;
import com.preporacaj.preporacaj_backend.model.enumeration.Status;
import com.preporacaj.preporacaj_backend.repository.ProfileRepository;
import com.preporacaj.preporacaj_backend.repository.RecommendationRepository;
import com.preporacaj.preporacaj_backend.service.RecommendationService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

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
    public Recommendation addRecommendation(RecommendationDto recommendationDto) {
        Profile profile = profileRepository.findById(recommendationDto.getProfileId()).orElseThrow(NoSuchElementException::new);
        Recommendation newRecommendation = new Recommendation();
        newRecommendation.setTitle(recommendationDto.getTitle());
        newRecommendation.setRecommendationContent(recommendationDto.getContent());
        newRecommendation.setRecommendationCategory(recommendationDto.getCategory());
        newRecommendation.setProfile(profile);
        return recommendationRepository.save(newRecommendation);
    }

    @Override
    public Recommendation editRecommendation(String recommendationId, RecommendationDto recommendationDto) {
        Recommendation oldRecommendation = recommendationRepository.findById(recommendationId).orElseThrow(NoSuchElementException::new);
        oldRecommendation.setTitle(recommendationDto.getTitle());
        oldRecommendation.setRecommendationContent(recommendationDto.getContent());
        oldRecommendation.setRecommendationCategory(recommendationDto.getCategory());
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
        recommendationRepository.save(recommendation);
    }

    @Override
    public void updateAvailabilityRating(String recommendationId, double newRating) {
        Recommendation recommendation = recommendationRepository.findById(recommendationId).orElseThrow(NoSuchElementException::new);
        double oldRating = recommendation.getAvailabilityRating();
        recommendation.setAvailabilityRating((oldRating * recommendation.getAvailabilityRatingCount() + newRating) / (recommendation.getAvailabilityRatingCount() + 1));
        recommendation.setAvailabilityRatingCount(recommendation.getAvailabilityRatingCount() + 1);
        recommendationRepository.save(recommendation);
        updateOverallRating(recommendationId);
    }

    @Override
    public void updateReliabilityRating(String recommendationId, double newRating) {
        Recommendation recommendation = recommendationRepository.findById(recommendationId).orElseThrow(NoSuchElementException::new);
        double oldRating = recommendation.getReliabilityRating();
        recommendation.setReliabilityRating((oldRating * recommendation.getReliabilityRatingCount() + newRating) / (recommendation.getReliabilityRatingCount() + 1));
        recommendation.setReliabilityRatingCount(recommendation.getReliabilityRatingCount() + 1);
        recommendationRepository.save(recommendation);
        updateOverallRating(recommendationId);
    }

    @Override
    public void updatePriceRating(String recommendationId, double newRating) {
        Recommendation recommendation = recommendationRepository.findById(recommendationId).orElseThrow(NoSuchElementException::new);
        double oldRating = recommendation.getPriceRating();
        recommendation.setPriceRating((oldRating * recommendation.getPriceRatingCount() + newRating) / (recommendation.getPriceRatingCount() + 1));
        recommendation.setPriceRatingCount(recommendation.getPriceRatingCount() + 1);
        recommendationRepository.save(recommendation);
        updateOverallRating(recommendationId);
    }

    private void updateOverallRating(String recommendationId) {
        Recommendation recommendation = recommendationRepository.findById(recommendationId).orElseThrow(NoSuchElementException::new);
        recommendation.setOverallRating((recommendation.getAvailabilityRating() + recommendation.getReliabilityRating() + recommendation.getPriceRating()) / 3);
        recommendationRepository.save(recommendation);
    }
}
