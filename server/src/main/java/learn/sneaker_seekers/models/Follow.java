package learn.sneaker_seekers.models;

public class Follow {
    private int followId;
    private int followerId;
    private int vendorId;

    public Follow(){}

    public Follow(int followId, int followerId, int vendorId){
        this.followId = followId;
        this.followerId = followerId;
        this.vendorId = vendorId;
    }

    public int getFollowId() {
        return followId;
    }

    public void setFollowId(int followId) {
        this.followId = followId;
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
