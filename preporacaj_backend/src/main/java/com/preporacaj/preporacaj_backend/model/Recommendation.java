package com.preporacaj.preporacaj_backend.model;

import com.preporacaj.preporacaj_backend.model.enumeration.RecommendationCategory;
import com.preporacaj.preporacaj_backend.model.enumeration.Status;
import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
public class Recommendation {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String title;

    private String recommendationContent;

    @Enumerated(EnumType.STRING)
    private RecommendationCategory recommendationCategory;

    @ManyToOne
    private Profile profile;

    @Enumerated(EnumType.STRING)
    private Status status = Status.ACTIVE;

    private Double availabilityRating = 0.0;

    private Integer availabilityRatingCount = 0;

    private Double reliabilityRating = 0.0;

    private Integer reliabilityRatingCount = 0;

    private Double priceRating = 0.0;

    private Integer priceRatingCount = 0;

    private Double overallRating = 0.0;
}
