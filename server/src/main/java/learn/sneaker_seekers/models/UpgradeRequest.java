package learn.sneaker_seekers.models;

public class UpgradeRequest {
    private int upgradeRequestId;
    private int appUserId;

    public UpgradeRequest(){}

    public UpgradeRequest(int upgradeRequestId, int appUserId){
        this.upgradeRequestId = upgradeRequestId;
        this.appUserId = appUserId;
    }

    public int getUpgradeRequestId() {
        return upgradeRequestId;
    }

    public void setUpgradeRequestId(int upgradeRequestId) {
        this.upgradeRequestId = upgradeRequestId;
    }

    public int getAppUserId() {
        return appUserId;
    }

    public void setAppUserId(int appUserId) {
        this.appUserId = appUserId;
    }
}
