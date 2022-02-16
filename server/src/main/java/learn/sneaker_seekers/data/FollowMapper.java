package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Follow;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class FollowMapper implements RowMapper<Follow> {

    @Override
    public Follow mapRow(ResultSet rs, int rowNum) throws SQLException {

        Follow follow = new Follow();

        follow.setFollowerId(rs.getInt("follower_id"));
        follow.setVendorId(rs.getInt("vendor_id"));

        return follow;

    }
}
