package com.preporacaj.preporacaj_backend.model.dto;

import com.preporacaj.preporacaj_backend.model.enumeration.Role;
import lombok.Data;

@Data
public class RegisterProfileDto {
    private String email;
    private String password;
    private String name;
    private String surname;
    private Role role;
}
