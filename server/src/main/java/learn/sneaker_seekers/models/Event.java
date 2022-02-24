package learn.sneaker_seekers.models;

import java.time.LocalDate;

public class Event {
    private int eventId;
    private LocalDate eventDate;
    private int numTable;
    private String eventImage;
    private Location location;

    public Event() {}

    public Event(int eventId, LocalDate eventDate, int numTable, String eventImage, Location location){
        this.eventId = eventId;
        this.eventDate = eventDate;
        this.numTable = numTable;
        this.eventImage = eventImage;
        this.location = location;
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

    public String getEventImage() {
        return eventImage;
    }

    public void setEventImage(String eventImage) {
        this.eventImage = eventImage;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }
}
