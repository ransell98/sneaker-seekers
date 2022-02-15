package learn.sneaker_seekers.models;

import java.time.LocalDate;

public class Event {
    private int eventId;
    private LocalDate eventDate;
    private String eventLocation;
    private int numTable;

    public Event(){}

    public Event(int eventId, LocalDate eventDate, String eventLocation, int numTable){
        this.eventId = eventId;
        this.eventDate = eventDate;
        this.eventLocation = eventLocation;
        this.numTable = numTable;
    }

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

    public LocalDate getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
    }

    public String getEventLocation() {
        return eventLocation;
    }

    public void setEventLocation(String eventLocation) {
        this.eventLocation = eventLocation;
    }

    public int getNumTable() {
        return numTable;
    }

    public void setNumTable(int numTable) {
        this.numTable = numTable;
    }
}
