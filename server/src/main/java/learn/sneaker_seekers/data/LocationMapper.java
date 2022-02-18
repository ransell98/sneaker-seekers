package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Location;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class LocationMapper implements RowMapper<Location> {

    @Override
    public Location mapRow(ResultSet rs, int rowNum) throws SQLException {
        Location location = new Location();

        location.setLocationId(rs.getInt("location_id"));
        location.setLocationName(rs.getString("location_name"));
        location.setLocationAddress(rs.getString("location_address"));
        location.setLocationCity(rs.getString("location_city"));

        return location;
    }
}
