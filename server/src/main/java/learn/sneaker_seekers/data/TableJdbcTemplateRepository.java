package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Table;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class TableJdbcTemplateRepository implements TableRepository {

    private final JdbcTemplate jdbcTemplate;

    public TableJdbcTemplateRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }


    @Override
    public List<Table> findByEventId(int eventId) {

        final String sql = "select vendor_table_id, event_id, app_user_id, is_booked, table_number "
                + "from vendor_table "
                + "where event_id = " + eventId + ";";

        return jdbcTemplate.query(sql, new TableMapper());

    }

    @Override
    public Table add(Table table) throws DataAccessException {

        final String sql = "insert into vendor_table"
                + "(vendor_table_id, event_id, app_user_id, is_booked, table_number) "
                + "values (?, ?, ?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(conn -> {
            PreparedStatement statement = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setInt(1, table.getTableId());
            statement.setInt(2, table.getEventId());
            statement.setInt(3, table.getAppUserId());
            statement.setBoolean(4, table.isBooked());
            statement.setInt(5, table.getTableNumber());
            return statement;
        }, keyHolder);

        if (rowsAffected <= 0) {
            throw new DataAccessException("Table insert failed.", null);
        }

        table.setTableId(keyHolder.getKey().intValue());

        return table;

    }

    @Override
    public boolean update(Table table) throws DataAccessException {

        final String sql = "update table set "
                + "vendor_table_id = ?, "
                + "event_id = ?, "
                + "app_user_id = ?, "
                + "is_booked = ?, "
                + "table_number ? "
                + "where vendor_table_id = ?;";

        int rowsAffected = jdbcTemplate.update(sql,
                table.getTableId(),
                table.getEventId(),
                table.getAppUserId(),
                table.isBooked(),
                table.getTableNumber());

        return rowsAffected > 0;

    }

    @Override
    public int getMaxTables(int eventId) throws DataAccessException {
        final String sql = "select event_id, event_date, num_table, location_id "
                + "from `event` "
                + "where event_id = " + eventId + ";";

        return jdbcTemplate.queryForObject(sql, new EventMapper()).getNumTable();

    }
}
