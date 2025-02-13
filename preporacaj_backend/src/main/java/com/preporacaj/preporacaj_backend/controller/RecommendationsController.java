package com.preporacaj.preporacaj_backend.controller;

import com.preporacaj.preporacaj_backend.model.Recommendation;
import com.preporacaj.preporacaj_backend.model.dto.RecommendationDto;
import com.preporacaj.preporacaj_backend.model.enumeration.RecommendationCategory;
import com.preporacaj.preporacaj_backend.model.enumeration.Status;
import com.preporacaj.preporacaj_backend.service.RecommendationService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/recommendations")
@AllArgsConstructor
public class RecommendationsController {
    private final RecommendationService recommendationService;

    @GetMapping
    public List<Recommendation> getAll(Pageable pageable) {
        return recommendationService.getAll(pageable).getContent();
    }

    @GetMapping("/public/{recommendationId}")
    public ResponseEntity<Recommendation> getById(@PathVariable String recommendationId) {
        try {
            return new ResponseEntity<>(recommendationService.getByRecommendationId(recommendationId),
                    HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/public/category/{recommendationCategory}")
    public List<Recommendation> getByCategory(@PathVariable RecommendationCategory recommendationCategory, Pageable pageable) {
        return recommendationService.getByCategory(recommendationCategory, pageable).getContent();
    }

    @GetMapping("/public/profile/{profileId}")
    public List<Recommendation> getByProfileId(@PathVariable String profileId, Pageable pageable) {
        try {
            return recommendationService.getByProfileId(profileId, pageable).getContent();
        } catch (NoSuchElementException e) {
            return new ArrayList<>();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Recommendation> add(@RequestBody RecommendationDto recommendationDto) {
        try {
            return new ResponseEntity<>(recommendationService.addRecommendation(
                    recommendationDto),
                    HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/edit/{recommendationId}")
    public ResponseEntity<Recommendation> edit(@PathVariable String recommendationId,
                                               @RequestBody RecommendationDto recommendationDto) {
        try {
            return new ResponseEntity<>(recommendationService.editRecommendation(
                    recommendationId,
                    recommendationDto),
                    HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{recommendationId}")
    public ResponseEntity<Recommendation> delete(@PathVariable String recommendationId) {
        try {
            return new ResponseEntity<>(recommendationService.removeRecommendation(
                    recommendationId),
                    HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("hasRole('SUPERUSER')")
    @GetMapping("/status/{recommendationId}/{status}")
    public ResponseEntity<String> changeStatus(@PathVariable String recommendationId, @PathVariable Status status) {
        try {
            recommendationService.changeStatus(recommendationId, status);
            return new ResponseEntity<>("Success", HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>("Failed", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/public/rating/{recommendationId}/{rating}")
    public ResponseEntity<String> updateRating(@PathVariable String recommendationId, @PathVariable double rating) {
        try {
            recommendationService.updateRating(recommendationId, rating);
            return new ResponseEntity<>("Success", HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>("Failed", HttpStatus.NOT_FOUND);
        }

    }
}
