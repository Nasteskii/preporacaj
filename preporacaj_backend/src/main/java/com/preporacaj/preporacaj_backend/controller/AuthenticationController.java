package com.preporacaj.preporacaj_backend.controller;

import com.preporacaj.preporacaj_backend.model.Profile;
import com.preporacaj.preporacaj_backend.model.dto.LoginProfileDto;
import com.preporacaj.preporacaj_backend.model.dto.RegisterProfileDto;
import com.preporacaj.preporacaj_backend.model.response.LoginResponse;
import com.preporacaj.preporacaj_backend.service.AuthenticationService;
import com.preporacaj.preporacaj_backend.service.impl.JwtService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthenticationController {
    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    @PostMapping("/signup")
    public ResponseEntity<Profile> register(@RequestBody RegisterProfileDto registerProfileDto) {
        Profile registeredProfile = authenticationService.signup(registerProfileDto);

        return ResponseEntity.ok(registeredProfile);
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
}