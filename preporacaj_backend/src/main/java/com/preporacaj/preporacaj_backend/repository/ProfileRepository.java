package com.preporacaj.preporacaj_backend.repository;

import com.preporacaj.preporacaj_backend.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, String> {
}
