package com.preporacaj.preporacaj_backend.service.impl;

import com.preporacaj.preporacaj_backend.model.BlacklistedToken;
import com.preporacaj.preporacaj_backend.repository.BlacklistedTokenRepository;
import com.preporacaj.preporacaj_backend.service.TokenBlacklistService;
import jakarta.transaction.Transactional;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.stream.Collectors;

@Service
public class TokenBlacklistServiceImpl implements TokenBlacklistService {
    private final BlacklistedTokenRepository blacklistedTokenRepository;

    public TokenBlacklistServiceImpl(BlacklistedTokenRepository blacklistedTokenRepository) {
        this.blacklistedTokenRepository = blacklistedTokenRepository;
    }

    @Transactional
    @Override
    public void blacklistToken(String token, long expirationTimeInMillis) {
        Instant expirationDate = Instant.now().plusMillis(expirationTimeInMillis);
        BlacklistedToken blacklistedToken = new BlacklistedToken();
        blacklistedToken.setToken(token);
        blacklistedToken.setExpirationDate(expirationDate);
        blacklistedTokenRepository.save(blacklistedToken);
    }

    @Override
    public boolean isTokenBlacklisted(String token) {
        return blacklistedTokenRepository.existsByToken(token);
    }

    @Scheduled(fixedRate = 86400000)
    @Transactional
    public void cleanExpiredTokens() {
        blacklistedTokenRepository.deleteAll(
                blacklistedTokenRepository.findAll()
                        .stream()
                        .filter(token -> token.getExpirationDate().isBefore(Instant.now()))
                        .collect(Collectors.toList())
        );
    }

}
