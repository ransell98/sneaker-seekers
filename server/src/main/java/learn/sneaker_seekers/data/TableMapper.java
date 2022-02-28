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

        EventMapper eventMapper = new EventMapper();
        table.setEventId(eventMapper.mapRow(rs, rowNum));

        AppUserMapper appUserMapper = new AppUserMapper();
        table.setAppUserId(appUserMapper.mapRow(rs, rowNum));

        table.setBooked(rs.getBoolean("is_booked"));
        table.setTableNumber(rs.getInt("table_number"));

        return table;
    }

}
