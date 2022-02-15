package learn.sneaker_seekers.models;

import java.math.BigDecimal;

public class Listing {
    private int listingId;
    private int styleId;
    private BigDecimal listingPrice;
    private Condition listingCondition;
    private int quantity;
    private int tableId;

    public Listing(){}

    public Listing(int listingId, int styleId, BigDecimal listingPrice, Condition listingCondition, int quantity, int tableId){
        this.listingId = listingId;
        this.styleId = styleId;
        this.listingPrice = listingPrice;
        this.listingCondition = listingCondition;
        this.quantity = quantity;
        this.tableId = tableId;
    }

    public int getListingId() {
        return listingId;
    }

    public void setListingId(int listingId) {
        this.listingId = listingId;
    }

    public int getStyleId() {
        return styleId;
    }

    public void setStyleId(int styleId) {
        this.styleId = styleId;
    }

    public BigDecimal getListingPrice() {
        return listingPrice;
    }

    public void setListingPrice(BigDecimal listingPrice) {
        this.listingPrice = listingPrice;
    }

    public Condition getListingCondition() {
        return listingCondition;
    }

    public void setListingCondition(Condition listingCondition) {
        this.listingCondition = listingCondition;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getTableId() {
        return tableId;
    }

    public void setTableId(int tableId) {
        this.tableId = tableId;
    }
}
