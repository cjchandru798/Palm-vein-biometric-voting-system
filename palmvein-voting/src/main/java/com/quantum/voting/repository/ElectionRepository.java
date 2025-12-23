package com.quantum.voting.repository;

import com.quantum.voting.entity.Election;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ElectionRepository extends JpaRepository<Election, UUID> {
    List<Election> findByStatus(String status);
}