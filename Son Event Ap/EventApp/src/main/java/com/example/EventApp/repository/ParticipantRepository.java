package com.example.EventApp.repository;

import com.example.EventApp.model.Participant;
import com.example.EventApp.model.ParticipantId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, ParticipantId> {
}
