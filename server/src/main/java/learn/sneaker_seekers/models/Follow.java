package learn.sneaker_seekers.models;

public class Follow {

    private int followerId;
    private int vendorId;

    public Follow(){}

    public Follow(int followerId, int vendorId){
        this.followerId = followerId;
        this.vendorId = vendorId;
    }

    public int getFollowerId() {
        return followerId;
    }

    public void setFollowerId(int followerId) {
        this.followerId = followerId;
    }

    public int getVendorId() {
        return vendorId;
    }

    public void setVendorId(int vendorId) {
        this.vendorId = vendorId;
    }
}
