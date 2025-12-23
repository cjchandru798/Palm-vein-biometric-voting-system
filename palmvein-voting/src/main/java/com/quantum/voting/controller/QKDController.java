package com.quantum.voting.controller;

import com.quantum.voting.service.QKDService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/security/qkd")
@RequiredArgsConstructor
public class QKDController {

    private final QKDService qkdService;

    @GetMapping("/session-key")
    public ResponseEntity<String> getSessionKey() {
        try {
            return ResponseEntity.ok(qkdService.generateSessionKey());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Failed to generate key");
        }
    }
}
