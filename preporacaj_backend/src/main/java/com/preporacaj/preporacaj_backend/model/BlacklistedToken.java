package com.preporacaj.preporacaj_backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;

@Data
@Entity
public class BlacklistedToken {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @Column(nullable = false, unique = true)
    private String token;

    @Column(nullable = false)
    private Instant expirationDate;
}
