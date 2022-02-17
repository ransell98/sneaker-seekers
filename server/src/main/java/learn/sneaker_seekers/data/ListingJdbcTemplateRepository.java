package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Listing;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

public class ListingJdbcTemplateRepository implements ListingRepository{

    private final JdbcTemplate jdbcTemplate;

    public ListingJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {this.jdbcTemplate = jdbcTemplate;}

    @Override
    public List<Listing> findByTableId(int tableId) {

        final String sql = "select listing_id, listing_price, quantity, style_id, vendor_table_id, condition_id "
                + "from listing "
                + "where vendor_table_id = " + tableId + ";";

        return jdbcTemplate.query(sql, new ListingMapper());

    }

    @Override
    public Listing add(Listing listing) throws DataAccessException {

        final String sql = "insert into listing"
                + "(listing_id, listing_price, quantity, style_id, vendor_table_id, condition_id) "
                + "values (?, ?, ?, ?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(conn -> {
            PreparedStatement statement = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setInt(1, listing.getListingId());
            statement.setInt(2, listing.getListingPrice().intValue());
            statement.setInt(3, listing.getQuantity());
            statement.setInt(4, listing.getStyleId());
            statement.setInt(5, listing.getTableId());
            statement.setInt(6, listing.getListingCondition().getConditionId());
            return statement;
        }, keyHolder);

        if (rowsAffected <= 0) {
            throw new DataAccessException("Listing insert failed.", null);
        }

        listing.setListingId(keyHolder.getKey().intValue());

        return listing;

    }

    @Override
    public boolean deleteByListingId(int listingId) throws DataAccessException {

        int rowsAffected = jdbcTemplate.update("delete from listing where listing_id = ?;", listingId);
        return rowsAffected > 0;

    }
}
