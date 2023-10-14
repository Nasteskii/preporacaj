package com.preporacaj.preporacaj_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Data
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @ManyToOne
    private Profile profile;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Recommendation recommendation;
    private String commentContent;
}
