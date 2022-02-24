package learn.sneaker_seekers.models;

public class Table {
    private int tableId;
    private boolean isBooked;
    private int tableNumber;
    private Event eventId;
    private AppUser appUserId;


    public Table(){}

    public Table(int tableId, boolean isBooked, int tableNumber, Event eventId, AppUser appUserId) {
        this.tableId = tableId;
        this.isBooked = isBooked;
        this.tableNumber = tableNumber;
        this.eventId = eventId;
        this.appUserId = appUserId;
    }

    public int getTableId() {
        return tableId;
    }

    public void setTableId(int tableId) {
        this.tableId = tableId;
    }

    public Event getEventId() {
        return eventId;
    }

    public void setEventId(Event eventId) {
        this.eventId = eventId;
    }

    public AppUser getAppUserId() {
        return appUserId;
    }

    public void setAppUserId(AppUser appUserId) {
        this.appUserId = appUserId;
    }

    public boolean isBooked() {
        return isBooked;
    }

    public void setBooked(boolean booked) {
        isBooked = booked;
    }

    public int getTableNumber() {
        return tableNumber;
    }

    public void setTableNumber(int tableNumber) {
        this.tableNumber = tableNumber;
    }
}
