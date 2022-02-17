package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.UpgradeRequest;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UpgradeRequestMapper implements RowMapper<UpgradeRequest> {

    @Override
    public UpgradeRequest mapRow(ResultSet rs, int rowNum) throws SQLException {
        UpgradeRequest upgradeRequest = new UpgradeRequest();

        upgradeRequest.setUpgradeRequestId(rs.getInt("upgrade_request_id"));
        upgradeRequest.setAppUserId(rs.getInt("app_user_id"));

        return upgradeRequest;
    }

}
