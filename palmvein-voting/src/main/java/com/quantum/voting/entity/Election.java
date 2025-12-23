package com.quantum.voting.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "elections")
public class Election {

    @Id
    @GeneratedValue
    private UUID electionId;

    private String title;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String status; // ACTIVE / CLOSED

    @OneToMany(mappedBy = "election", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Candidate> candidates;
}
