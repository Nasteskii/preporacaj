package com.preporacaj.preporacaj_backend.controller;

import com.preporacaj.preporacaj_backend.model.Profile;
import com.preporacaj.preporacaj_backend.service.ProfileService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/profiles")
@AllArgsConstructor
public class ProfileController {
    private final ProfileService profileService;

    @PreAuthorize("hasRole('SUPERUSER')")
    @GetMapping
    public ResponseEntity<List<Profile>> allProfiles() {
        List<Profile> profiles = profileService.allProfiles();

        return ResponseEntity.ok(profiles);
    }

    @GetMapping("/me")
    public ResponseEntity<Profile> authenticatedProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Profile currentProfile = (Profile) authentication.getPrincipal();

        return ResponseEntity.ok(currentProfile);
    }
}