package com.preporacaj.preporacaj_backend.service;

import com.preporacaj.preporacaj_backend.model.Profile;
import com.preporacaj.preporacaj_backend.model.dto.LoginProfileDto;
import com.preporacaj.preporacaj_backend.model.dto.RegisterProfileDto;

public interface AuthenticationService {
    Profile signup(RegisterProfileDto input);

    Profile authenticate(LoginProfileDto input);
}