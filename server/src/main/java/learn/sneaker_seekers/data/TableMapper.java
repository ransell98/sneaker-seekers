package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.AppUser;
import learn.sneaker_seekers.models.Event;
import learn.sneaker_seekers.models.Table;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TableMapper implements RowMapper<Table> {

    @Override
    public Table mapRow(ResultSet rs, int rowNum) throws SQLException {
        Table table = new Table();

        table.setTableId(rs.getInt("vendor_table_id"));
        table.setBooked(rs.getBoolean("is_booked"));
        table.setTableNumber(rs.getInt("table_number"));

        EventMapper eventMapper = new EventMapper();
        table.setEvent(eventMapper.mapRow(rs, rowNum));

        /*
        AppUserMapper appUserMapper = new AppUserMapper();
        table.setAppUserId(appUserMapper.mapRow(rs, rowNum));
        */

        int vendorId = rs.getInt("app_user_id");
        AppUser user = new AppUser();
        user.setId(vendorId);
        user.setUsername(rs.getString("username"));
        user.setProfilePicture(rs.getString("profile_picture"));
        user.setFirstName(rs.getString("first_name"));
        user.setLastName(rs.getString("last_name"));
        user.setEmail(rs.getString("email"));
        table.setAppUser(user);

        return table;
    }

}
