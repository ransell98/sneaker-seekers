package learn.sneaker_seekers.models;



public class Follow {

    private AppUser follower;
    private AppUser vendor;

    public Follow(){}

    public Follow(AppUser follower, AppUser vendor){
        this.follower = follower;
        this.vendor = vendor;
    }

    public AppUser getFollower() {
        return follower;
    }

    public void setFollower(AppUser follower) {
        this.follower = follower;
    }

    public AppUser getVendor() {
        return vendor;
    }

    public void setVendor(AppUser vendor) {
        this.vendor = vendor;
    }
}
