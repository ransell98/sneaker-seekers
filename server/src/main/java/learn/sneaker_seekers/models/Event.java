package learn.sneaker_seekers.models;

import java.time.LocalDate;

public class Event {
    private int eventId;
    private LocalDate eventDate;
    private int numTable;
    private int locationId;

    public Event(){}

    public Event(int eventId, LocalDate eventDate, int numTable, int locationId){
        this.eventId = eventId;
        this.eventDate = eventDate;
        this.numTable = numTable;
        this.locationId = locationId;
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

    public int getNumTable() {
        return numTable;
    }

    public void setNumTable(int numTable) {
        this.numTable = numTable;
    }

    public int getLocationId() {
        return locationId;
    }

    public void setLocationId(int locationId) {
        this.locationId = locationId;
    }
}
