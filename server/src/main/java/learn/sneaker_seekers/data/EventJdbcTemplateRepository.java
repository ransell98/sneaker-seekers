package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Event;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class EventJdbcTemplateRepository implements EventRepository {

    private final JdbcTemplate jdbcTemplate;

    public EventJdbcTemplateRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }


    @Override
    public List<Event> findAll() {

        final String sql = "select event_id, event_name, event_date, num_table, event_image, location_id "
                + "from `event`;";

        return jdbcTemplate.query(sql, new EventMapper());

    }

    @Override
    public Event findByEventId(int eventId) {

        final String sql = "select event_id, event_name, event_date, num_table, location_id "
                + "from `event` "
                + "where event_id = " + eventId + ";";

        return jdbcTemplate.queryForObject(sql, new EventMapper(), eventId);

    }

    @Override
    public Event add(Event event) throws DataAccessException {

        final String sql = "insert into `event`"
                + "(event_id, event_name, event_date, num_table, event_image, location_id) "
                + "values (?, ?, ?, ?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(conn -> {
            PreparedStatement statement = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setInt(1, event.getEventId());
            statement.setString(2, event.getEventName());
            statement.setString(3, event.getEventDate().toString());
            statement.setInt(4, event.getNumTable());
            statement.setString(5, event.getEventImage());
            statement.setInt(6, event.getLocation().getLocationId());
            return statement;
        }, keyHolder);

        if (rowsAffected <= 0) {
            throw new DataAccessException("Event insert failed.", null);
        }

        event.setEventId(keyHolder.getKey().intValue());

        return event;

    }

    @Override
    public boolean deleteByEventId(int eventId) throws DataAccessException {

        int rowsAffected = jdbcTemplate.update("delete from `event` where event_id = ?;", eventId);
        return rowsAffected > 0;

    }
}
