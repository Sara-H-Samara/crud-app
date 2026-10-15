package com.example.crud_app.auth;

import com.example.crud_app.auth.dto.AuthResponse;
import com.example.crud_app.auth.dto.LoginRequest;
import com.example.crud_app.auth.dto.RegisterRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public AuthService(AccountRepository accountRepository,
                       PasswordEncoder passwordEncoder,
                       TokenService tokenService) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
    }

    public AuthResponse register(RegisterRequest request) {
        String email = request.email().trim().toLowerCase();

        if (accountRepository.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "This email is already registered.");
        }

        // hash the password before saving: the database never sees the real password
        String hash = passwordEncoder.encode(request.password());
        Account account = accountRepository.save(new Account(request.name().trim(), email, hash));

        return tokenService.createToken(account); // logged in straight away
    }

    public AuthResponse login(LoginRequest request) {
        String email = request.email().trim().toLowerCase();

        Account account = accountRepository.findByEmail(email)
                .filter(found -> passwordEncoder.matches(request.password(), found.getPassword()))
                // same message for wrong email and wrong password: don't reveal which one
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED, "Invalid email or password."));

        return tokenService.createToken(account);
    }
}