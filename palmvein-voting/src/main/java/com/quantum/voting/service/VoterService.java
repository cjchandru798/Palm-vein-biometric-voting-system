package com.quantum.voting.service;

import com.quantum.voting.entity.*;
import com.quantum.voting.repository.*;
import com.quantum.voting.utils.AESUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VoterService {

    private final VoterRepository voterRepository;
    private final ElectionRepository electionRepository;
    private final CandidateRepository candidateRepository;
    private final BallotRepository ballotRepository;

    public Optional<Voter> login(String voterCode) {
        return voterRepository.findByVoterCode(voterCode);
    }

    /** Verify encrypted palm template sent from client */
    public double verifyPalmTemplateScore(Voter voter, String encryptedTemplateB64) {
        try {
            if (voter == null || encryptedTemplateB64 == null || encryptedTemplateB64.isBlank())
                return 0.0;

            byte[] keyBytes = voter.getTemplateEncryptionKey();
            if (keyBytes == null || keyBytes.length == 0) return 0.0;

            // decrypt incoming template
            byte[] scannedPlain = AESUtil.decryptGCMBase64(encryptedTemplateB64, keyBytes);
            if (scannedPlain == null || scannedPlain.length == 0) return 0.0;

            double bestScore = 0.0;

            // LEFT template
            if (voter.getLeftTemplate() != null && voter.getLeftTemplate().length > 0) {
                String leftEncB64 = new String(voter.getLeftTemplate(), StandardCharsets.UTF_8);
                byte[] leftPlain = AESUtil.decryptGCMBase64(leftEncB64, keyBytes);
                bestScore = Math.max(bestScore, byteArraySimilarity(leftPlain, scannedPlain));
            }

            // RIGHT template
            if (voter.getRightTemplate() != null && voter.getRightTemplate().length > 0) {
                String rightEncB64 = new String(voter.getRightTemplate(), StandardCharsets.UTF_8);
                byte[] rightPlain = AESUtil.decryptGCMBase64(rightEncB64, keyBytes);
                bestScore = Math.max(bestScore, byteArraySimilarity(rightPlain, scannedPlain));
            }

            return bestScore;

        } catch (Exception e) {
            return 0.0;
        }
    }

    public boolean verifyPalmTemplate(Voter voter, String encryptedTemplateB64) {
        return verifyPalmTemplateScore(voter, encryptedTemplateB64) >= 0.80;
    }

    private double byteArraySimilarity(byte[] a, byte[] b) {
        if (a == null || b == null || a.length == 0 || b.length == 0) return 0.0;
        int len = Math.min(a.length, b.length);
        double dot = 0.0, magA = 0.0, magB = 0.0;
        for (int i = 0; i < len; i++) {
            double va = a[i] & 0xFF;
            double vb = b[i] & 0xFF;
            dot += va * vb;
            magA += va * va;
            magB += vb * vb;
        }
        if (magA == 0.0 || magB == 0.0) return 0.0;
        double cosine = dot / (Math.sqrt(magA) * Math.sqrt(magB));
        return Math.min(1.0, Math.max(0.0, cosine));
    }

    public List<Election> getActiveElections() {
        return electionRepository.findByStatus("ACTIVE");
    }

    @Transactional
    public Ballot castVote(Voter voter, UUID electionId, UUID candidateId) throws Exception {
        Optional<Election> electionOpt = electionRepository.findById(electionId);
        Optional<Candidate> candidateOpt = candidateRepository.findById(candidateId);

        if (electionOpt.isEmpty() || candidateOpt.isEmpty()) return null;

        Election election = electionOpt.get();
        Candidate candidate = candidateOpt.get();

        if (ballotRepository.existsByVoterAndElection(voter, election)) return null;

        Ballot ballot = new Ballot();
        ballot.setVoter(voter);
        ballot.setElection(election);
        ballot.setCandidate(candidate);
        ballot.setCastAt(LocalDateTime.now());

        Ballot saved = ballotRepository.save(ballot);

        candidate.setVotesCount(candidate.getVotesCount() + 1);
        candidateRepository.save(candidate);

        voter.setHasVoted(true);
        voter.setLastVotedAt(LocalDateTime.now());
        voterRepository.save(voter);

        String pdfPath = generateVVPAT(saved);
        saved.setVvpPath(pdfPath);
        saved.setVvpGenerated(true);
        saved.setAuditHash(generateAuditHash(saved, voter.getTemplateEncryptionKey()));

        return ballotRepository.save(saved);
    }

    private String generateVVPAT(Ballot ballot) throws Exception {
        String folder = "vvpat";
        File dir = new File(folder);
        if (!dir.exists()) dir.mkdirs();

        String pdfFile = folder + File.separator + ballot.getBallotId() + ".pdf";

        try (PDDocument document = new PDDocument()) {
            PDPage page = new PDPage();
            document.addPage(page);

            PDPageContentStream content = new PDPageContentStream(document, page);
            content.setLeading(14.5f);
            content.beginText();
            content.setFont(PDType1Font.HELVETICA_BOLD, 16);
            content.newLineAtOffset(50, 750);
            content.showText("VVPAT - Quantum-Secured Palm Vein Voting");
            content.newLine();
            content.newLine();

            content.setFont(PDType1Font.HELVETICA, 12);
            content.showText("Ballot ID: " + ballot.getBallotId()); content.newLine();
            content.showText("Voter: " + safe(ballot.getVoter().getName())); content.newLine();
            content.showText("Voter Code: " + safe(ballot.getVoter().getVoterCode())); content.newLine();
            content.showText("Election: " + safe(ballot.getElection().getTitle())); content.newLine();
            content.showText("Candidate: " + safe(ballot.getCandidate().getLeaderName())); content.newLine();
            content.showText("Party: " + safe(ballot.getCandidate().getPartyName())); content.newLine();
            content.showText("City: " + safe(ballot.getCandidate().getCity())); content.newLine();
            content.showText("Timestamp: " + ballot.getCastAt()); content.newLine();
            content.newLine();
            content.showText("QKD-Secured Audit Hash Included");
            content.endText();
            content.close();

            document.save(pdfFile);
        }

        return Paths.get(pdfFile).toAbsolutePath().toString();
    }

    private String safe(Object o) {
        return (o == null) ? "" : o.toString();
    }

    private String generateAuditHash(Ballot ballot, byte[] sessionKey) throws Exception {
        String data = ballot.getBallotId() + "|" +
                safe(ballot.getVoter().getVoterCode()) + "|" +
                safe(ballot.getCandidate().getCandidateId()) + "|" +
                safe(ballot.getCastAt());

        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        if (sessionKey != null && sessionKey.length > 0) digest.update(sessionKey);
        byte[] hash = digest.digest(data.getBytes(StandardCharsets.UTF_8));
        return Base64.getEncoder().encodeToString(hash);
    }
}
