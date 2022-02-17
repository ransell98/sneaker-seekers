package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Table;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TableMapper implements RowMapper<Table> {

    @Override
    public Table mapRow(ResultSet rs, int rowNum) throws SQLException {
        Table table = new Table();

        table.setTableId(rs.getInt("vendor_table_id"));
        table.setEventId(rs.getInt("event_id"));
        table.setAppUserId(rs.getInt("app_user_id"));
        table.setBooked(rs.getBoolean("is_booked"));

        return table;
    }

}
