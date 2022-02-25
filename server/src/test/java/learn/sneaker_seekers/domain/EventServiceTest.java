package learn.sneaker_seekers.domain;

import learn.sneaker_seekers.data.DataAccessException;
import learn.sneaker_seekers.data.EventRepository;
import learn.sneaker_seekers.models.Event;
import learn.sneaker_seekers.models.Location;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDate;
import java.util.List;

import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class EventServiceTest {

    @MockBean
    EventRepository repository;

    @Autowired
    EventService service;

    @Test
    void shouldFindAll() {
        List<Event> expected = service.findAll();
        when(repository.findAll()).thenReturn(expected);
        List<Event> actual = service.findAll();
        assertEquals(expected, actual);
    }

    @Test
    void shouldFindById() {
        Event expected = service.findByEventId(2);
        when(repository.findByEventId(2)).thenReturn(expected);
        Event actual = service.findByEventId(2);
        assertEquals(expected, actual);
    }

    @Test
    void shouldNotFindNonExistingId() {
        Event expected = service.findByEventId(81);
        when(repository.findByEventId(81)).thenReturn(expected);
        Event actual = service.findByEventId(81);
        assertEquals(expected, actual);
    }

    @Test
    void shouldAdd() throws DataAccessException {
        Event event = makeEvent();
        Event mockEvent = makeEvent();

        when(repository.add(event)).thenReturn(mockEvent);
        Result<Event> actual = service.add(event);
        assertEquals(ResultType.SUCCESS, actual.getStatus());
        assertEquals(mockEvent, actual.getPayload());
    }

    @Test
    void shouldNotAddNull() throws DataAccessException {
        Result<Event> result = service.add(null);
        assertEquals(ResultType.INVALID, result.getStatus());
        assertNull(result.getPayload());
    }

    @Test
    void shouldNotAddWhenInvalid() throws DataAccessException {
        Event event = new Event();

        event.setNumTable(-1);
        event.setEventDate(LocalDate.of(2013, 07, 21));

        Result<Event> actual = service.add(event);
        assertEquals(ResultType.INVALID, actual.getStatus());
    }

    Event makeEvent() throws DataAccessException {
        Event event = new Event();
        event.setEventName("Convention 4");
        event.setEventDate(LocalDate.of(2024, 05, 15));
        event.setNumTable(50);
        event.setEventImage(null);

        Location location = new Location();
        location.setLocationId(3);

        event.setLocation(location);
        return event;
    }


}