package learn.sneaker_seekers.models;



public class Follow {

    private AppUser followerId;
    private AppUser vendorId;

    public Follow(){}

    public Follow(AppUser followerId, AppUser vendorId){
        this.followerId = followerId;
        this.vendorId = vendorId;
    }

    public AppUser getFollowerId() {
        return followerId;
    }

    public void setFollowerId(AppUser followerId) {
        this.followerId = followerId;
    }

    public AppUser getVendorId() {
        return vendorId;
    }

    public void setVendorId(AppUser vendorId) {
        this.vendorId = vendorId;
    }
}
