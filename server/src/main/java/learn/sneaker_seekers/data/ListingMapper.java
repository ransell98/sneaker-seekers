package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Condition;
import learn.sneaker_seekers.models.Listing;
import learn.sneaker_seekers.models.Table;
import org.springframework.jdbc.core.RowMapper;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ListingMapper implements RowMapper<Listing> {

    @Override
    public Listing mapRow(ResultSet rs, int rowNum) throws SQLException {
        Listing listing = new Listing();

        listing.setListingId(rs.getInt("listing_id"));
        listing.setListingPrice(BigDecimal.valueOf(rs.getInt("listing_price")));
        listing.setQuantity(rs.getInt("quantity"));
        listing.setStyleId(rs.getInt("style_id"));

        int tableId = rs.getInt("vendor_table_id");
        Table table = new Table();
        table.setTableId(tableId);

        int conditionId = rs.getInt("condition_id");
        Condition condition = new Condition();
        condition.setConditionId(conditionId);
        switch (conditionId) {
            case 1:
                condition.setConditionName("NEW");
                break;
            case 2:
                condition.setConditionName("USED");
                break;
            case 3:
                condition.setConditionName("NEW WITH DEFECTS");
                break;
            default:
                condition.setConditionName("UNKNOWN");
                break;
        }

        listing.setListingCondition(condition);

        return listing;

    }

}
