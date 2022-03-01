package learn.sneaker_seekers.models;

import java.math.BigDecimal;

public class Listing {
    private int listingId;
    private Style style;
    private BigDecimal listingPrice;
    private Condition listingCondition;
    private int quantity;
    private Table table;

    public Listing(){}

    public Listing(int listingId, Style style, BigDecimal listingPrice, Condition listingCondition, int quantity, Table table){
        this.listingId = listingId;
        this.style = style;
        this.listingPrice = listingPrice;
        this.listingCondition = listingCondition;
        this.quantity = quantity;
        this.table = table;
    }

    public int getListingId() {
        return listingId;
    }

    public void setListingId(int listingId) {
        this.listingId = listingId;
    }

    public Style getStyle() {
        return style;
    }

    public void setStyle(Style style) {
        this.style = style;
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

    public Table getTable() {
        return table;
    }

    public void setTable(Table table) {
        this.table = table;
    }
}
