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

        final String sql = "select v.vendor_table_id, v.is_booked, v.table_number, " +
                "v.event_id, " +
                "a.app_user_id, a.username, a.profile_picture, a.first_name, a.last_name, a.email " +
                "from vendor_table v " +
                "inner join app_user a on v.app_user_id = a.app_user_id " +
                "where v.event_id = " + eventId + ";";

        return jdbcTemplate.query(sql, new TableMapper());

    }

    @Override
    public Table add(Table table) throws DataAccessException {

        final String sql = "insert into vendor_table"
                + "(vendor_table_id, is_booked, table_number, event_id, app_user_id) "
                + "values (?, ?, ?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(conn -> {
            PreparedStatement statement = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setInt(1, table.getTableId());
            statement.setBoolean(2, table.isBooked());
            statement.setInt(3, table.getTableNumber());
            statement.setInt(4, table.getEventId().getEventId());
            statement.setInt(5, table.getAppUser().getId());
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

        final String sql = "update vendor_table set "
                + "vendor_table_id = ?, "
                + "is_booked = ?, "
                + "table_number = ?, "
                + "event_id = ?, "
                + "app_user_id = ? "
                + "where vendor_table_id = ?;";

        int rowsAffected = jdbcTemplate.update(sql,
                table.getTableId(),
                table.isBooked(),
                table.getTableNumber(),
                table.getEventId().getEventId(),
                table.getAppUser().getId(),
                table.getTableId());

        return rowsAffected > 0;

    }
/*
    @Override
    public int getMaxTables(int eventId) throws DataAccessException {
        final String sql = "select event_id, event_name, event_date, num_table, event_image, location_id "
                + "from `event` "
                + "where event_id = " + eventId + ";";

        return jdbcTemplate.queryForObject(sql, new EventMapper()).getNumTable();

    }*/

    @Override
    public int getMaxTables(int eventId) throws DataAccessException {
        final String sql = "select num_table "
                + "from `event` "
                + "where event_id = " + eventId + ";";

        Integer result = jdbcTemplate.queryForObject(sql, Integer.class);

        return result != null ? result : 0;
    }
}
