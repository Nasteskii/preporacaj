package com.preporacaj.preporacaj_backend.service.impl;

import com.preporacaj.preporacaj_backend.model.Profile;
import com.preporacaj.preporacaj_backend.model.dto.LoginProfileDto;
import com.preporacaj.preporacaj_backend.model.dto.RegisterProfileDto;
import com.preporacaj.preporacaj_backend.repository.ProfileRepository;
import com.preporacaj.preporacaj_backend.service.AuthenticationService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    private final ProfileRepository profileRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public AuthenticationServiceImpl(
            ProfileRepository profileRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.profileRepository = profileRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Profile signup(RegisterProfileDto input) {
        Profile profile = new Profile();
        profile.setName(input.getName());
        profile.setSurname(input.getSurname());
        profile.setEmail(input.getEmail());
        profile.setPassword(passwordEncoder.encode(input.getPassword()));
        profile.setRole(input.getRole());

        return profileRepository.save(profile);
    }

    public Profile authenticate(LoginProfileDto input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        return profileRepository.findByEmail(input.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("Profile wit email " + input.getEmail() + "not found"));
    }
}
