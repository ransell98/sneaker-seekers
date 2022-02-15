package learn.sneaker_seekers.models;

public class Style {
    private int styleId;
    private String styleName;
    private int brandId;
    private String description;
    private int releaseYear;

    public Style(){}

    public Style(int styleId, String styleName, int brandId, String description, int releaseYear){
        this.styleId = styleId;
        this.styleName = styleName;
        this.brandId = brandId;
        this.description = description;
        this.releaseYear = releaseYear;
    }

    public int getStyleId() {
        return styleId;
    }

    public void setStyleId(int styleId) {
        this.styleId = styleId;
    }

    public String getStyleName() {
        return styleName;
    }

    public void setStyleName(String styleName) {
        this.styleName = styleName;
    }

    public int getBrandId() {
        return brandId;
    }

    public void setBrandId(int brandId) {
        this.brandId = brandId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(int releaseYear) {
        this.releaseYear = releaseYear;
    }
}
