package com.preporacaj.preporacaj_backend.service;

public interface TokenBlacklistService {
    void blacklistToken(String token, long expirationTimeInMillis);
    boolean isTokenBlacklisted(String token);
}
