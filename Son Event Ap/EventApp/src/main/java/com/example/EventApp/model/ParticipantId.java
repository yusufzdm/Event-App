package com.example.EventApp.model;

import lombok.Data;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Data
@Embeddable
public class ParticipantId implements Serializable {

    private Integer userId;
    private Integer eventId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ParticipantId)) return false;
        ParticipantId that = (ParticipantId) o;
        return Objects.equals(getUserId(), that.getUserId()) &&
                Objects.equals(getEventId(), that.getEventId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getUserId(), getEventId());
    }
}
