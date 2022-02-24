package learn.sneaker_seekers.models;

public class Favorite {
    private int favoriteId;
    private Style style;
    private AppUser appUser;

    public Favorite(){}

    public Favorite(int favoriteId, Style style, AppUser appUser){
        this.favoriteId = favoriteId;
        this.style = style;
        this.appUser = appUser;
    }

    public int getFavoriteId() {
        return favoriteId;
    }

    public void setFavoriteId(int favoriteId) {
        this.favoriteId = favoriteId;
    }

    public Style getStyle() {
        return style;
    }

    public void setStyle(Style style) {
        this.style = style;
    }

    public AppUser getAppUser() {
        return appUser;
    }

    public void setAppUser(AppUser appUser) {
        this.appUser = appUser;
    }
}
