package com.quantum.voting.repository;
import com.quantum.voting.entity.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CandidateRepository extends JpaRepository<Candidate, UUID> {}
