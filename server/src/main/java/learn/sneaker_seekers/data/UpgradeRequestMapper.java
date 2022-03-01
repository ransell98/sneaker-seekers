package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.AppUser;
import learn.sneaker_seekers.models.UpgradeRequest;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UpgradeRequestMapper implements RowMapper<UpgradeRequest> {

    @Override
    public UpgradeRequest mapRow(ResultSet rs, int rowNum) throws SQLException {
        UpgradeRequest upgradeRequest = new UpgradeRequest();
        upgradeRequest.setUpgradeRequestId(rs.getInt("upgrade_request_id"));

        AppUser appUser = new AppUser();
        appUser.setId(rs.getInt("app_user_id"));
        appUser.setUsername(rs.getString("username"));
        appUser.setProfilePicture(rs.getString("profile_picture"));
        appUser.setFirstName(rs.getString("first_name"));
        appUser.setLastName(rs.getString("last_name"));
        appUser.setEmail(rs.getString("email"));


        upgradeRequest.setAppUserId(appUser);
        /*
        AppUserMapper appUserMapper = new AppUserMapper();
        upgradeRequest.setAppUserId(appUserMapper.mapRow(rs, rowNum));


         */
        return upgradeRequest;
    }

}
