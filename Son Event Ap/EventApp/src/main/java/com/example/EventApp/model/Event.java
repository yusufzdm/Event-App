package com.example.EventApp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Data
@Table(name="events")
@AllArgsConstructor
@NoArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="event_id")
    private Integer id;

    @Column(name="name")
    private String name;

    @Column(name="location")
    private String location;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="date")
    private Date date;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Participant> participants;
}
