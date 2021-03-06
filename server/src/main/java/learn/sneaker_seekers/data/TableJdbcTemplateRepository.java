package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.AppUser;
import learn.sneaker_seekers.models.Brand;
import learn.sneaker_seekers.models.Table;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
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
    public List<Table> findAllByUser(AppUser appUser) {

        final String sql = "select v.vendor_table_id, v.is_booked, v.table_number, e.event_id, "
                + "e.event_name, e.event_date, e.num_table, e.event_image, l.location_id, "
                + "l.location_name, l.location_address, l.location_city, a.app_user_id, "
                + "a.username, a.profile_picture, a.first_name, a.last_name, a.email "
                + "from vendor_table v "
                + "inner join app_user a on v.app_user_id = a.app_user_id "
                + "inner join `event` e on v.event_id = e.event_id "
                + "inner join location l on e.location_id = l.location_id "
                + "where v.app_user_id = " + appUser.getId() + ";";

        return jdbcTemplate.query(sql, new TableMapper());
    }

    @Override
    public List<Table> findByEventId(int eventId) {

        final String sql = "select v.vendor_table_id, v.is_booked, v.table_number, e.event_id, "
                + "e.event_name, e.event_date, e.num_table, e.event_image, l.location_id, "
                + "l.location_name, l.location_address, l.location_city, a.app_user_id, "
                + "a.username, a.profile_picture, a.first_name, a.last_name, a.email "
                + "from vendor_table v "
                + "inner join app_user a on v.app_user_id = a.app_user_id "
                + "inner join `event` e on v.event_id = e.event_id "
                + "inner join location l on e.location_id = l.location_id "
                + "where e.event_id = " + eventId + ";";

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
            statement.setInt(4, table.getEvent().getEventId());
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
                table.getEvent().getEventId(),
                table.getAppUser().getId(),
                table.getTableId());

        return rowsAffected > 0;

    }

    @Override
    public int getMaxTables(int eventId) throws DataAccessException {
        final String sql = "select num_table "
                + "from `event` "
                + "where event_id = " + eventId + ";";

        Integer result = jdbcTemplate.queryForObject(sql, Integer.class);

        return result != null ? result : 0;
    }

    @Override
    public boolean isTableBooked(int eventId, int tableNumber) throws DataAccessException {
        final String sql = "select is_booked "
                + "from vendor_table "
                + "where event_id = " + eventId + " and table_number = " + tableNumber + ";";

        try {
            Boolean result = jdbcTemplate.queryForObject(sql, Boolean.class);
            return result;
        } catch (IncorrectResultSizeDataAccessException e){
            return false;
        }
    }

    @Override
    public boolean doesUserAlreadyHaveTable(int eventId, int appUserId) throws DataAccessException {
        final String sql = "select is_booked "
                + "from vendor_table "
                + "where event_id = " + eventId + " and app_user_id = " + appUserId + ";";

        try {
            Boolean result = jdbcTemplate.queryForObject(sql, Boolean.class);
            return result;
        } catch (IncorrectResultSizeDataAccessException e){
            return false;
        }
    }


}
