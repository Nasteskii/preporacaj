package com.preporacaj.preporacaj_backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;
    @ManyToOne
    private Profile profile;
    @ManyToOne
    private Recommendation recommendation;
    private String commentContent;
}
