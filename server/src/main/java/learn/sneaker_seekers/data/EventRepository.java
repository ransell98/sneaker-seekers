package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Event;

import java.util.List;

public interface EventRepository {

    List<Event> findAll();

    Event findByEventId(int eventId);

    Event add(Event event) throws DataAccessException;

    boolean deleteByEventId(int eventId) throws DataAccessException;

}
