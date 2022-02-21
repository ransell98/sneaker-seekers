package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Brand;
import learn.sneaker_seekers.models.Event;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class EventJdbcTemplateRepositoryTest {

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
}