package com.quantum.voting.controller;

import com.quantum.voting.entity.Ballot;
import com.quantum.voting.entity.Voter;
import com.quantum.voting.repository.BallotRepository;
import com.quantum.voting.service.VoterService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileInputStream;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/voter")
@RequiredArgsConstructor
public class VoterController {

    private final VoterService voterService;
    private final BallotRepository ballotRepository;

    // ✅ FIXED: Always returns ResponseEntity<Object>
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestParam String voterCode) {
        Optional<Voter> voter = voterService.login(voterCode);

        if (voter.isPresent()) {
            return ResponseEntity.ok(voter.get());
        }

        return ResponseEntity.status(404)
                .body(Map.of("message", "Voter not found"));
    }

    @PostMapping("/scan")
    public ResponseEntity<Object> scanPalm(@RequestBody ScanRequest request) {
        Optional<Voter> voterOpt = voterService.login(request.getVoterCode());
        if (voterOpt.isEmpty()) {
            return ResponseEntity.status(404)
                    .body(Map.of("verified", false, "score", 0.0, "message", "Voter not found"));
        }

        double score = voterService.verifyPalmTemplateScore(voterOpt.get(), request.getEncryptedTemplate());
        boolean verified = score >= 0.80;

        Map<String, Object> response = Map.of(
                "verified", verified,
                "score", score
        );

        return verified ? ResponseEntity.ok(response)
                : ResponseEntity.status(401).body(response);
    }

    @PostMapping("/vote")
    public ResponseEntity<Object> castVote(@RequestParam String voterCode,
                                           @RequestParam UUID electionId,
                                           @RequestParam UUID candidateId) {

        Optional<Voter> voterOpt = voterService.login(voterCode);
        if (voterOpt.isEmpty())
            return ResponseEntity.status(404).body("Voter not found");

        try {
            Ballot ballot = voterService.castVote(voterOpt.get(), electionId, candidateId);

            if (ballot == null)
                return ResponseEntity.badRequest().body("Vote failed (already voted or invalid)");

            return ResponseEntity.ok(Map.of(
                    "message", "Vote cast successfully",
                    "path", ballot.getVvpPath(),
                    "auditHash", ballot.getAuditHash(),
                    "ballotId", ballot.getBallotId()
            ));

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Error casting vote: " + e.getMessage());
        }
    }

    @GetMapping("/ballot/{id}/vvp")
    public ResponseEntity<Object> downloadVVP(@PathVariable UUID id) {
        Optional<Ballot> ballotOpt = ballotRepository.findById(id);
        if (ballotOpt.isEmpty()) return ResponseEntity.status(404).body("Ballot not found");

        Ballot ballot = ballotOpt.get();
        if (!ballot.isVvpGenerated()) return ResponseEntity.badRequest().body("VVPAT not generated yet");

        File file = new File(ballot.getVvpPath());
        if (!file.exists()) return ResponseEntity.status(404).body("VVPAT file missing");

        try {
            InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + file.getName());

            return ResponseEntity.ok()
                    .headers(headers)
                    .contentLength(file.length())
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(resource);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Failed to read VVPAT file");
        }
    }

    @Data
    public static class ScanRequest {
        private String voterCode;
        private String encryptedTemplate;
    }
}
