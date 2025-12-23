package com.quantum.voting.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ballots")
public class Ballot {

    @Id
    @GeneratedValue
    private UUID ballotId;

    @ManyToOne
    @JoinColumn(name = "voter_id")
    private Voter voter;

    @ManyToOne
    @JoinColumn(name = "election_id")
    private Election election;

    @ManyToOne
    @JoinColumn(name = "candidate_id")
    private Candidate candidate;

    private LocalDateTime castAt = LocalDateTime.now();
    private boolean vvpGenerated = false;
    private String vvpPath;
    private String auditHash;
}
