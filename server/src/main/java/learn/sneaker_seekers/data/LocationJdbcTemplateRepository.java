package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Location;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class LocationJdbcTemplateRepository implements LocationRepository{

    private final JdbcTemplate jdbcTemplate;

    public LocationJdbcTemplateRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }

    @Override
    public List<Location> findAll() {

        final String sql = "select location_id, location_name, location_address, location_city "
                + "from location;";

        return jdbcTemplate.query(sql, new LocationMapper());

    }

    @Override
    public Location findByLocationId(int locationId) {

        final String sql = "select location_id, location_name, location_address, location_city "
                + "from location "
                + "where location_id = " + locationId + ";";

        return jdbcTemplate.queryForObject(sql, new LocationMapper());

    }

    @Override
    public Location add(Location location) throws DataAccessException {

        final String sql = "insert into location"
                + "(location_id, location_name, location_address, location_city) "
                + "values (?, ?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(conn -> {
            PreparedStatement statement = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setInt(1, location.getLocationId());
            statement.setString(2, location.getLocationName());
            statement.setString(3, location.getLocationAddress());
            statement.setString(4, location.getLocationCity());
            return statement;
        }, keyHolder);

        if (rowsAffected <= 0) {
            throw new DataAccessException("Location insert failed.", null);
        }

        location.setLocationId(keyHolder.getKey().intValue());

        return location;

    }
}
