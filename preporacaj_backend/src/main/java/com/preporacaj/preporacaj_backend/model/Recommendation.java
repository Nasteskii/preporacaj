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
    @Enumerated
    private Status status;
    private Double rating;
    private Integer ratingsCount;
    @ManyToOne
    private Profile profile;
}
