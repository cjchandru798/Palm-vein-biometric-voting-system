package com.quantum.voting.repository;

import com.quantum.voting.entity.Voter;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface VoterRepository extends JpaRepository<Voter, UUID> {
    Optional<Voter> findByVoterCode(String voterCode);
}
