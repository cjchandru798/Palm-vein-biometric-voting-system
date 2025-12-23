package com.quantum.voting.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "candidates")
public class Candidate {

    @Id
    @GeneratedValue
    private UUID candidateId;

    @ManyToOne
    @JoinColumn(name = "election_id")
    @JsonIgnore
    private Election election;

    private String leaderName;
    private String partyName;
    private String city;
    private int votesCount = 0;
}
