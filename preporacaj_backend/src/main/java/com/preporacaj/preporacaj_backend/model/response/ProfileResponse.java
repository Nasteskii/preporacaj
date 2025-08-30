package com.preporacaj.preporacaj_backend.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProfileResponse {
    private String id;
    private String email;
    private String name;
    private String surname;
}