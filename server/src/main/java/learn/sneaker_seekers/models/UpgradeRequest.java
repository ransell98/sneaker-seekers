package learn.sneaker_seekers.models;

public class UpgradeRequest {
    private int upgradeRequestId;
    private AppUser appUser;

    public UpgradeRequest(){}

    public UpgradeRequest(int upgradeRequestId, AppUser appUser){
        this.upgradeRequestId = upgradeRequestId;
        this.appUser = appUser;
    }

    public int getUpgradeRequestId() {
        return upgradeRequestId;
    }

    public void setUpgradeRequestId(int upgradeRequestId) {
        this.upgradeRequestId = upgradeRequestId;
    }

    public AppUser getAppUser() {
        return appUser;
    }

    public void setAppUser(AppUser appUser) {
        this.appUser = appUser;
    }
}
