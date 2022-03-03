package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.UpgradeRequest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class UpgradeRequestJdbcTemplateRepository implements UpgradeRequestRepository{

    private final JdbcTemplate jdbcTemplate;

    public UpgradeRequestJdbcTemplateRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }

    @Override
    public List<UpgradeRequest> findAll() {

        final String sql = "select u.upgrade_request_id, a.app_user_id, a.username, a.profile_picture, a.first_name, "
                + "a.last_name, a.email "
                + "from upgrade_request u "
                + "inner join app_user a on u.app_user_id = a.app_user_id;";

        return jdbcTemplate.query(sql, new UpgradeRequestMapper());

    }

    @Override
    public List<UpgradeRequest> findByAppUserId(int appUserId) {
        final String sql = "select u.upgrade_request_id, a.app_user_id, a.username, a.profile_picture, a.first_name, "
                + "a.last_name, a.email "
                + "from upgrade_request u "
                + "inner join app_user a on u.app_user_id = a.app_user_id;"
                + "where f.app_user_id = " + appUserId + ";";

        return jdbcTemplate.query(sql, new UpgradeRequestMapper());

    }


    @Override
    public UpgradeRequest add(UpgradeRequest upgradeRequest) throws DataAccessException {

        final String sql = "insert into upgrade_request"
                + "(upgrade_request_id, app_user_id) "
                + "values (?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(conn -> {
            PreparedStatement statement = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setInt(1, upgradeRequest.getUpgradeRequestId());
            statement.setInt(2, upgradeRequest.getAppUser().getId());
            return statement;
        }, keyHolder);

        if (rowsAffected <= 0) {
            throw new DataAccessException("Upgrade Request insert failed.", null);
        }

        upgradeRequest.setUpgradeRequestId(keyHolder.getKey().intValue());

        return upgradeRequest;

    }

    @Override
    public boolean deleteByUpgradeRequestId(int upgradeRequestId) throws DataAccessException {

        int rowsAffected = jdbcTemplate.update("delete from upgrade_request where upgrade_request_id = ?;", upgradeRequestId);
        return rowsAffected > 0;

    }
}
