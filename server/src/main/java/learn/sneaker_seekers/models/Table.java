package learn.sneaker_seekers.models;

public class Table {
    private int tableId;
    private boolean isBooked;
    private int tableNumber;
    private Event eventId;
    private AppUser appUser;


    public Table(){}

    public Table(int tableId, boolean isBooked, int tableNumber, Event eventId, AppUser appUser) {
        this.tableId = tableId;
        this.isBooked = isBooked;
        this.tableNumber = tableNumber;
        this.eventId = eventId;
        this.appUser = appUser;
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

    public AppUser getAppUser() {
        return appUser;
    }

    public void setAppUser(AppUser appUser) {
        this.appUser = appUser;
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
