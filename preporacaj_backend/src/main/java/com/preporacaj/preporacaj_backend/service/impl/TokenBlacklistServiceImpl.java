package com.preporacaj.preporacaj_backend.service.impl;

import com.preporacaj.preporacaj_backend.service.TokenBlacklistService;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class TokenBlacklistServiceImpl implements TokenBlacklistService {
    private StringRedisTemplate redisTemplate;

    public void TokenBlacklistService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void blacklistToken(String token, long expirationTimeInMillis) {
        long expirationSeconds = expirationTimeInMillis / 1000;
        redisTemplate.opsForValue().set(token, "blacklisted", expirationSeconds, TimeUnit.SECONDS);
    }

    public boolean isTokenBlacklisted(String token) {
        return redisTemplate.hasKey(token);
    }
}
