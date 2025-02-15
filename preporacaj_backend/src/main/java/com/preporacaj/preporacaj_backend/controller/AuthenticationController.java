package com.preporacaj.preporacaj_backend.controller;

import com.preporacaj.preporacaj_backend.model.Profile;
import com.preporacaj.preporacaj_backend.model.dto.LoginProfileDto;
import com.preporacaj.preporacaj_backend.model.dto.RegisterProfileDto;
import com.preporacaj.preporacaj_backend.model.response.LoginResponse;
import com.preporacaj.preporacaj_backend.service.AuthenticationService;
import com.preporacaj.preporacaj_backend.service.TokenBlacklistService;
import com.preporacaj.preporacaj_backend.service.impl.JwtService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthenticationController {
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;
    private final TokenBlacklistService tokenBlacklistService;

    @PostMapping("/signup")
    public ResponseEntity<LoginResponse> register(@RequestBody RegisterProfileDto registerProfileDto) {
        Profile registeredProfile = authenticationService.signup(registerProfileDto);
        String jwtToken = jwtService.generateToken(registeredProfile);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginProfileDto loginUserDto) {
        Profile authenticatedUser = authenticationService.authenticate(loginUserDto);
        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("Invalid token format");
        }

        String token = authHeader.substring(7);
        long expirationTime = jwtService.getExpirationTime();

        tokenBlacklistService.blacklistToken(token, expirationTime);

        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Logged out successfully");
    }
}