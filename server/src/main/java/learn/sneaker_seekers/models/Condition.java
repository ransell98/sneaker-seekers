package learn.sneaker_seekers.models;

public class Condition {
    private int conditionId;
    private String conditionName;

    public Condition(){}

    public Condition(int conditionId, String conditionName){
        this.conditionId = conditionId;
        this.conditionName = conditionName;
    }

    public int getConditionId() {
        return conditionId;
    }

    public void setConditionId(int conditionId) {
        this.conditionId = conditionId;
    }

    public String getConditionName() {
        return conditionName;
    }

    public void setConditionName(String conditionName) {
        this.conditionName = conditionName;
    }
}
