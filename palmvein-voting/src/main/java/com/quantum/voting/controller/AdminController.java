package com.quantum.voting.controller;

import com.quantum.voting.DTO.RegisterTemplateRequest;
import com.quantum.voting.entity.Candidate;
import com.quantum.voting.entity.Election;
import com.quantum.voting.entity.Voter;
import com.quantum.voting.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");
        boolean success = adminService.login(username, password);
        if (success) return ResponseEntity.ok("Login successful");
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    @PostMapping("/voters")
    public ResponseEntity<Voter> createVoter(@RequestBody Voter voter) {
        return ResponseEntity.ok(adminService.createVoter(voter));
    }

    @GetMapping("/voters")
    public ResponseEntity<List<Voter>> getVoters() {
        return ResponseEntity.ok(adminService.getAllVoters());
    }

    @PostMapping("/voters/{voterCode}/register-template")
    public ResponseEntity<?> registerTemplate(
            @PathVariable String voterCode,
            @RequestBody RegisterTemplateRequest request
    ) {
        try {
            Voter voter = adminService.registerPalmTemplate(
                    voterCode,
                    request.getLeftTemplate(),
                    request.getRightTemplate(),
                    request.getSessionKey()
            );

            if (voter == null) {
                return ResponseEntity.badRequest().body("Voter not found");
            }

            return ResponseEntity.ok(voter);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Failed: " + e.getMessage());
        }
    }


    // -------------------------
    // Create Election
    // -------------------------
    @PostMapping("/elections")
    public ResponseEntity<?> createElection(@RequestBody Election election) {
        try {
            Election saved = adminService.createElection(election);
            return ResponseEntity.ok(saved);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Failed to create election");
        }
    }

    // -------------------------
    // Add candidate to election
    // -------------------------
    @PostMapping("/elections/{electionId}/candidates")
    public ResponseEntity<?> addCandidate(@PathVariable UUID electionId,
                                          @RequestBody Candidate candidate) {
        Candidate saved = adminService.addCandidateToElection(electionId, candidate);
        if (saved == null) return ResponseEntity.badRequest().body("Election not found");
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/elections")
    public ResponseEntity<List<Election>> listElections() {
        return ResponseEntity.ok(adminService.getAllElections());
    }
}
