package com.preporacaj.preporacaj_backend.controller;

import com.preporacaj.preporacaj_backend.model.Recommendation;
import com.preporacaj.preporacaj_backend.model.enumeration.RecommendationCategory;
import com.preporacaj.preporacaj_backend.model.enumeration.Status;
import com.preporacaj.preporacaj_backend.service.RecommendationService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("api/recommendations")
@AllArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:5173", "http://localhost:5174"})
public class RecommendationsController {
    private final RecommendationService recommendationService;

    @GetMapping
    public List<Recommendation> getAll(Pageable pageable) {
        return recommendationService.getAll(pageable).getContent();
    }

    @GetMapping("/{recommendationId}")
    public ResponseEntity<Recommendation> getById(@PathVariable String recommendationId) {
        try {
            return new ResponseEntity<>(recommendationService.getByRecommendationId(recommendationId),
                    HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/category/{recommendationCategory}")
    public List<Recommendation> getByCategory(@PathVariable RecommendationCategory recommendationCategory, Pageable pageable) {
        return recommendationService.getByCategory(recommendationCategory, pageable).getContent();
    }

    @GetMapping("/profile/{profileId}")
    public List<Recommendation> getByProfileId(@PathVariable String profileId, Pageable pageable) {
        try {
            return recommendationService.getByProfileId(profileId, pageable).getContent();
        } catch (NoSuchElementException e) {
            return new ArrayList<>();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Recommendation> add(@RequestParam String title,
                                              @RequestParam String recommendationContent,
                                              @RequestParam String category,
                                              @RequestParam String profileId) {
        try {
            RecommendationCategory recommendationCategory = RecommendationCategory.valueOf(category.toUpperCase());
            return new ResponseEntity<>(recommendationService.addRecommendation(
                    title,
                    recommendationContent,
                    recommendationCategory,
                    profileId),
                    HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/edit/{recommendationId}")
    public ResponseEntity<Recommendation> edit(@PathVariable String recommendationId,
                                               @RequestParam String title,
                                               @RequestParam String recommendationContent,
                                               @RequestParam RecommendationCategory recommendationCategory,
                                               @RequestParam Status status,
                                               @RequestParam String profileId) {
        try {
            return new ResponseEntity<>(recommendationService.editRecommendation(
                    recommendationId,
                    title,
                    recommendationContent,
                    recommendationCategory,
                    status,
                    profileId),
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

    @GetMapping("status/{recommendationId}/{status}")
    public ResponseEntity<String> changeStatus(@PathVariable String recommendationId, @PathVariable Status status) {
        try {
            recommendationService.changeStatus(recommendationId, status);
            return new ResponseEntity<>("Success", HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>("Failed", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("rating/{recommendationId}/{rating}")
    public ResponseEntity<String> updateRating(@PathVariable String recommendationId, @PathVariable double rating) {
        try {
            recommendationService.updateRating(recommendationId, rating);
            return new ResponseEntity<>("Success", HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>("Failed", HttpStatus.NOT_FOUND);
        }

    }
}
