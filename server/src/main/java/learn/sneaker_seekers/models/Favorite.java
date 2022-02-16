package learn.sneaker_seekers.models;

public class Favorite {
    private int favoriteId;
    private int styleId;
    private int appUserId;

    public Favorite(){}

    public Favorite(int favoriteId, int styleId, int appUserId){
        this.favoriteId = favoriteId;
        this.styleId = styleId;
        this.appUserId = appUserId;
    }

    public int getFavoriteId() {
        return favoriteId;
    }

    public void setFavoriteId(int favoriteId) {
        this.favoriteId = favoriteId;
    }

    public int getStyleId() {
        return styleId;
    }

    public void setStyleId(int styleId) {
        this.styleId = styleId;
    }

    public int getAppUserId() {
        return appUserId;
    }

    public void setAppUserId(int appUserId) {
        this.appUserId = appUserId;
    }
}
