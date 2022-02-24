package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.AppUser;
import learn.sneaker_seekers.models.Follow;
import learn.sneaker_seekers.models.Location;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class FollowMapper implements RowMapper<Follow> {

    @Override
    public Follow mapRow(ResultSet rs, int rowNum) throws SQLException {

        Follow follow = new Follow();

        int followerId = rs.getInt("follower_id");
        AppUser followerUser = new AppUser();
        followerUser.setId(followerId);

        int vendorId = rs.getInt("vendor_id");
        AppUser vendorUser = new AppUser();
        vendorUser.setId(vendorId);

        return follow;

    }
}
