package com.preporacaj.preporacaj_backend.model.dto;

import com.preporacaj.preporacaj_backend.model.enumeration.RecommendationCategory;
import lombok.Data;

@Data
public class RecommendationDto {
    private String title;
    private String content;
    private RecommendationCategory category;
    private String profileId;
}
