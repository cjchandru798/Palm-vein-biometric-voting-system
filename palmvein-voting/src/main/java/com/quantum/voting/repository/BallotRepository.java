package com.quantum.voting.repository;

import com.quantum.voting.entity.Ballot;
import com.quantum.voting.entity.Election;
import com.quantum.voting.entity.Voter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface BallotRepository extends JpaRepository<Ballot, UUID> {
    boolean existsByVoterAndElection(Voter voter, Election election);
}
