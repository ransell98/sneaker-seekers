package learn.sneaker_seekers.models;

import java.time.LocalDate;

public class Style {
    private int styleId;
    private String externalStyleId;
    private String styleName;
    private Brand brand;
    private String description;
    private LocalDate releaseYear;
    private String colorway;
    private String styleImage;

    public Style(){}

    public Style(int styleId, String externalStyleId, String styleName, Brand brand, String description, LocalDate releaseYear, String colorway, String styleImage){
        this.styleId = styleId;
        this.externalStyleId = externalStyleId;
        this.styleName = styleName;
        this.brand = brand;
        this.description = description;
        this.releaseYear = releaseYear;
        this.colorway = colorway;
        this.styleImage = styleImage;
    }

    public int getStyleId() {
        return styleId;
    }

    public void setStyleId(int styleId) {
        this.styleId = styleId;
    }

    public String getExternalStyleId() {
        return externalStyleId;
    }

    public void setExternalStyleId(String externalStyleId) {
        this.externalStyleId = externalStyleId;
    }

    public String getStyleName() {
        return styleName;
    }

    public void setStyleName(String styleName) {
        this.styleName = styleName;
    }

    public Brand getBrand() {
        return brand;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(LocalDate releaseYear) {
        this.releaseYear = releaseYear;
    }

    public String getColorway() {
        return colorway;
    }

    public void setColorway(String colorway) {
        this.colorway = colorway;
    }

    public String getStyleImage() {
        return styleImage;
    }

    public void setStyleImage(String styleImage) {
        this.styleImage = styleImage;
    }
}
