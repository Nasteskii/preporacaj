package com.preporacaj.preporacaj_backend.controller;

import com.preporacaj.preporacaj_backend.model.Profile;
import com.preporacaj.preporacaj_backend.model.response.ProfileResponse;
import com.preporacaj.preporacaj_backend.service.ProfileService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/profiles")
@AllArgsConstructor
public class ProfileController {
    private final ProfileService profileService;

    @PreAuthorize("hasRole('SUPERUSER')")
    @GetMapping
    public ResponseEntity<List<ProfileResponse>> allProfiles() {
        try {
            List<Profile> profiles = profileService.allProfiles();
            List<ProfileResponse> profileResponses =
                    profiles.stream().map(profile -> new ProfileResponse(
                                    profile.getId(), profile.getEmail(),
                                    profile.getName(), profile.getSurname())
                            )
                            .toList();

            return new ResponseEntity<>(profileResponses, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/me")
    public ResponseEntity<ProfileResponse> authenticatedProfile() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Profile currentProfile = (Profile) authentication.getPrincipal();

            ProfileResponse profileResponse = new ProfileResponse(
                    currentProfile.getId(), currentProfile.getEmail(),
                    currentProfile.getName(), currentProfile.getSurname()
            );

            return new ResponseEntity<>(profileResponse, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
}