package learn.sneaker_seekers.models;

public class Location {
    private int locationId;
    private String locationName;
    private String locationAddress;
    private String locationCity;

    public Location(){}

    public Location(int locationId, String locationName, String locationAddress, String locationCity){
        this.locationId = locationId;
        this.locationName = locationName;
        this.locationAddress = locationAddress;
        this.locationCity = locationCity;
    }

    public int getLocationId() {
        return locationId;
    }

    public void setLocationId(int locationId) {
        this.locationId = locationId;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public String getLocationAddress() {
        return locationAddress;
    }

    public void setLocationAddress(String locationAddress) {
        this.locationAddress = locationAddress;
    }

    public String getLocationCity() {
        return locationCity;
    }

    public void setLocationCity(String locationCity) {
        this.locationCity = locationCity;
    }
}
