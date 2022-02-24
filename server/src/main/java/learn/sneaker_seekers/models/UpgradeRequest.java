package learn.sneaker_seekers.models;

public class UpgradeRequest {
    private int upgradeRequestId;
    private AppUser appUserId;

    public UpgradeRequest(){}

    public UpgradeRequest(int upgradeRequestId, AppUser appUserId){
        this.upgradeRequestId = upgradeRequestId;
        this.appUserId = appUserId;
    }

    public int getUpgradeRequestId() {
        return upgradeRequestId;
    }

    public void setUpgradeRequestId(int upgradeRequestId) {
        this.upgradeRequestId = upgradeRequestId;
    }

    public AppUser getAppUserId() {
        return appUserId;
    }

    public void setAppUserId(AppUser appUserId) {
        this.appUserId = appUserId;
    }
}
