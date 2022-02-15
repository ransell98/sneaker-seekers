package learn.sneaker_seekers.models;

public class Favorite {
    private int favoriteId;
    private int shoeId;
    private int appUserId;

    public Favorite(){}

    public Favorite(int favoriteId, int shoeId, int appUserId){
        this.favoriteId = favoriteId;
        this.shoeId = shoeId;
        this.appUserId = appUserId;
    }

    public int getFavoriteId() {
        return favoriteId;
    }

    public void setFavoriteId(int favoriteId) {
        this.favoriteId = favoriteId;
    }

    public int getShoeId() {
        return shoeId;
    }

    public void setShoeId(int shoeId) {
        this.shoeId = shoeId;
    }

    public int getAppUserId() {
        return appUserId;
    }

    public void setAppUserId(int appUserId) {
        this.appUserId = appUserId;
    }
}
