package com.example.crud_app.auth.dto;

/** What the frontend receives after login/register. */
public record AuthResponse(
        String token,
        long expiresAt, // milliseconds since 1970 → new Date(expiresAt) in JavaScript
        String name,
        String email
) {}