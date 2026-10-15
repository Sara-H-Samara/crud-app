package com.example.crud_app.auth;

import com.example.crud_app.auth.dto.AuthResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
public class TokenService {

    private final JwtEncoder jwtEncoder;
    private final long expirationMinutes;

    public TokenService(JwtEncoder jwtEncoder,
                        @Value("${app.jwt.expiration-minutes}") long expirationMinutes) {
        this.jwtEncoder = jwtEncoder;
        this.expirationMinutes = expirationMinutes;
    }

    public AuthResponse createToken(Account account) {
        Instant now = Instant.now();
        Instant expiresAt = now.plus(expirationMinutes, ChronoUnit.MINUTES);

        // the token's payload ("claims")
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("crud-app")
                .issuedAt(now)
                .expiresAt(expiresAt)
                .subject(account.getEmail())          // who the token belongs to
                .claim("name", account.getName())
                .build();

        JwsHeader header = JwsHeader.with(MacAlgorithm.HS256).build();

        String token = jwtEncoder.encode(JwtEncoderParameters.from(header, claims)).getTokenValue();

        return new AuthResponse(token, expiresAt.toEpochMilli(), account.getName(), account.getEmail());
    }
}