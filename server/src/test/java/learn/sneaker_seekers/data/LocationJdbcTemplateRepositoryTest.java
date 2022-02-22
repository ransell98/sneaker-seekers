package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Location;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class LocationJdbcTemplateRepositoryTest {

    final static int NEXT_ID = 4;

    @Autowired
    LocationJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<Location> location = repository.findAll();
        assertNotNull(location);
        assertTrue(location.size() >= 3);
    }

    @Test
    void shouldFindById() {
        Location location = repository.findByLocationId(2);
        assertEquals(2, location.getLocationId());
        assertEquals("Los Angeles Convention Center", location.getLocationName());
    }

    @Test
    void shouldAdd() throws DataAccessException {
        Location location = new Location();
        location.setLocationName("Atlanta Convention Center");
        location.setLocationAddress("240 Peachtree St NW");
        location.setLocationCity("Atlanta, GA");

        Location actual = repository.add(location);
        assertNotNull(actual);
        assertEquals(NEXT_ID, actual.getLocationId());
    }

}