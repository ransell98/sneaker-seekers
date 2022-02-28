package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Follow;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class FollowJdbcTemplateRepository implements FollowRepository {

    private final JdbcTemplate jdbcTemplate;

    public FollowJdbcTemplateRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }


    @Override
    public List<Follow> findByFollowerId(int followerId) {

        final String sql = "select f.follower_id, f.vendor_id, a.app_user_id, a.username, a.profile_picture, a.first_name, "
                + "a.last_name, a.email "
                + "from follow f "
                + "inner join app_user a on f.vendor_id = a.app_user_id "
                + "where follower_id = " + followerId + ";";

        return jdbcTemplate.query(sql, new FollowMapper());

    }

    @Override
    public Follow add(Follow follow) throws DataAccessException {

        final String sql = "insert into follow"
                + "(follower_id, vendor_id) "
                + "values (?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(conn -> {
            PreparedStatement statement = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setInt(1, follow.getFollowerId().getId());
            statement.setInt(2, follow.getVendorId().getId());
            return statement;
        }, keyHolder);

        if (rowsAffected <= 0) {
            throw new DataAccessException("Follow insert failed.", null);
        }

        return follow;

    }

    @Override
    public boolean deleteByFollowerIdAndVendorId(int followerId, int vendorId) throws DataAccessException {

        final String sql = "delete from follow "
                + "where follower_id = " + followerId + " and vendor_id = " + vendorId + ";";

        int rowsAffected = jdbcTemplate.update(sql);
        return rowsAffected > 0;

    }
}
