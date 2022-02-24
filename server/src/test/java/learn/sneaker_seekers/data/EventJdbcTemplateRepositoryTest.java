package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Event;
import learn.sneaker_seekers.models.Location;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class EventJdbcTemplateRepositoryTest {
    final static int NEXT_ID = 4;

    @Autowired
    EventJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<Event> event = repository.findAll();
        assertNotNull(event);
        assertTrue(event.size() >= 3);
    }

    @Test
    void shouldAdd() throws DataAccessException {
        Event event = new Event();
        event.setEventDate(LocalDate.of(2022, 8, 15));
        event.setNumTable(20);
        event.setEventImage(null);

        Location location = new Location();
        location.setLocationId(2);
        event.setLocation(location);

        Event actual = repository.add(event);
        assertNotNull(actual);
        assertEquals(NEXT_ID, actual.getEventId());
    }

    @Test
    void shouldDelete() throws DataAccessException {
        assertTrue(repository.deleteByEventId(1));
    }

    @Test
    void shouldNotDeleteMissing() throws DataAccessException {
        assertFalse(repository.deleteByEventId(30));
    }
}