package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Event;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;

public class EventMapper implements RowMapper<Event> {

    @Override
    public Event mapRow(ResultSet rs, int rowNum) throws SQLException {
        Event event = new Event();

        event.setEventId(rs.getInt("event_id"));
        String eventDateString = rs.getString("event_date");
        event.setEventDate(LocalDate.parse(eventDateString));
        event.setNumTable(rs.getInt("num_table"));
        event.setEventImage(rs.getString("event_image"));
        event.setLocationId(rs.getInt("location_id"));

        return event;
    }

}
