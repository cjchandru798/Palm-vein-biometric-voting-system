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
@Table(name = "voters")
public class Voter {

    @Id
    @GeneratedValue
    private UUID voterId;

    @Column(unique = true, nullable = false)
    private String voterCode;

    @Column(nullable = false)
    private String name;

    private String mobile;
    private LocalDateTime dob;
    private LocalDateTime registeredAt = LocalDateTime.now();

    @Column(columnDefinition = "BYTEA")
    private byte[] leftTemplate;

    @Column(columnDefinition = "BYTEA")

    private byte[] rightTemplate;

    private boolean leftRegistered = false;
    private boolean rightRegistered = false;
    private boolean hasVoted = false;
    private LocalDateTime lastVotedAt;

    @Column(columnDefinition = "BYTEA")
    private byte[] templateEncryptionKey; // QKD session key
}
