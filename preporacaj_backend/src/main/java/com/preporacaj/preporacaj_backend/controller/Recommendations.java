package com.preporacaj.preporacaj_backend.controller;

import com.preporacaj.preporacaj_backend.model.Recommendation;
import com.preporacaj.preporacaj_backend.service.RecommendationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/recommendations")
public class Recommendations {
    private final RecommendationService recommendationService;

    @GetMapping
    public List<Recommendation> getAll() {
        return recommendationService.getAll();
    }
}
