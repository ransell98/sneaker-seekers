package learn.sneaker_seekers.domain;

import learn.sneaker_seekers.data.DataAccessException;
import learn.sneaker_seekers.data.EventRepository;
import learn.sneaker_seekers.models.Event;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EventService {
    private final EventRepository repository;

    public EventService(EventRepository repository) { this.repository = repository; }

    public List<Event> findAll() { return repository.findAll(); }

    public Event findByEventId(int eventId) { return repository.findByEventId(eventId); }

    public Result add(Event event) throws DataAccessException {
        Result result = validate(event);
        if (!result.isSuccess()) {
            return result;
        }

        if (event.getEventId() != 0) {
            result.addErrorMessage("Event ID must not be set for add.");
            return result;
        }

        event = repository.add(event);
        result.setPayload(event);
        return result;
    }

    private Result validate(Event event) {
        Result result = new Result();

        if (event == null) {
            result.addMessage("Event cannot be null.", ResultType.INVALID);
        }

        if (!event.getEventDate().isAfter(LocalDate.now())) {
            result.addMessage("Event must be in the future.", ResultType.INVALID);
        }

        if (event.getNumTable() <= 0) {
            result.addMessage("Number of tables must be positive.", ResultType.INVALID);
        }

        return result;
    }
}
