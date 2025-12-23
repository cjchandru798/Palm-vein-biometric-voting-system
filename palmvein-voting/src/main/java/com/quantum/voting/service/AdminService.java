package com.quantum.voting.service;

import com.quantum.voting.entity.Candidate;
import com.quantum.voting.entity.Election;
import com.quantum.voting.entity.Voter;
import com.quantum.voting.repository.CandidateRepository;
import com.quantum.voting.repository.ElectionRepository;
import com.quantum.voting.repository.VoterRepository;
import com.quantum.voting.utils.AESUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final VoterRepository voterRepository;
    private final ElectionRepository electionRepository;
    private final CandidateRepository candidateRepository;
    private final QKDService qkdService; // Ensure injected

    public Voter createVoter(Voter voter) {
        Optional<Voter> existing = voterRepository.findByVoterCode(voter.getVoterCode());
        return existing.orElseGet(() -> voterRepository.save(voter));
    }

    public List<Voter> getAllVoters() {
        return voterRepository.findAll();
    }

    public boolean login(String username, String password) {
        return "admin1".equals(username) && "admin123".equals(password);
    }

    /**
     * Secure upload of palm templates
     */
    public Voter registerPalmTemplate(String voterCode,
                                      String leftTemplateBase64,
                                      String rightTemplateBase64,
                                      String sessionKeyBase64) throws Exception {

        Optional<Voter> voterOpt = voterRepository.findByVoterCode(voterCode);
        if (voterOpt.isEmpty()) return null;

        Voter voter = voterOpt.get();

        // Determine which session key to use
        String keyBase64 = (sessionKeyBase64 == null || sessionKeyBase64.isBlank())
                ? qkdService.generateSessionKey()       // QKD generated
                : sessionKeyBase64;

        byte[] keyBytes = AESUtil.base64ToKeyBytes(keyBase64);

        // Encrypt LEFT palm template
        if (leftTemplateBase64 != null && !leftTemplateBase64.isBlank()) {
            byte[] leftRawBytes = Base64.getDecoder().decode(leftTemplateBase64);
            String encryptedLeft = AESUtil.encryptGCM(leftRawBytes, keyBytes); // <-- new method
            voter.setLeftTemplate(encryptedLeft.getBytes());
            voter.setLeftRegistered(true);
        }

        // Encrypt RIGHT palm template
        if (rightTemplateBase64 != null && !rightTemplateBase64.isBlank()) {
            byte[] rightRawBytes = Base64.getDecoder().decode(rightTemplateBase64);
            String encryptedRight = AESUtil.encryptGCM(rightRawBytes, keyBytes); // <-- new method
            voter.setRightTemplate(encryptedRight.getBytes());
            voter.setRightRegistered(true);
        }

        // Store AES key bytes if first time
        if (voter.getTemplateEncryptionKey() == null) {
            voter.setTemplateEncryptionKey(keyBytes);
        }

        return voterRepository.save(voter);
    }

    public Election createElection(Election election) {
        if (election.getTitle() == null || election.getTitle().isBlank()) {
            throw new IllegalArgumentException("Election title required");
        }
        if (election.getStatus() == null) {
            election.setStatus("ACTIVE");
        }
        return electionRepository.save(election);
    }

    public Candidate addCandidateToElection(java.util.UUID electionId, Candidate candidate) {
        Optional<Election> eOpt = electionRepository.findById(electionId);
        if (eOpt.isEmpty()) return null;

        Election election = eOpt.get();
        candidate.setElection(election);
        if (candidate.getVotesCount() < 0) candidate.setVotesCount(0);
        return candidateRepository.save(candidate);
    }

    public List<Election> getAllElections() {
        return electionRepository.findAll();
    }
}
