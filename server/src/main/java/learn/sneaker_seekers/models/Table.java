package learn.sneaker_seekers.models;

public class Table {
    private int tableId;
    private int eventId;
    private int appUserId;
    private boolean isBooked;

    public Table(){}

    public Table(int tableId, int eventId, int appUserId, boolean isBooked){
        this.tableId = tableId;
        this.eventId = eventId;
        this.appUserId = appUserId;
        this.isBooked = isBooked;
    }

    public int getTableId() {
        return tableId;
    }

    public void setTableId(int tableId) {
        this.tableId = tableId;
    }

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

    public int getAppUserId() {
        return appUserId;
    }

    public void setAppUserId(int appUserId) {
        this.appUserId = appUserId;
    }

    public boolean isBooked() {
        return isBooked;
    }

    public void setBooked(boolean booked) {
        isBooked = booked;
    }
}
