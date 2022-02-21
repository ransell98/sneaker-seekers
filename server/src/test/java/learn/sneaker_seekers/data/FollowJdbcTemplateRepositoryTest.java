package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Follow;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class FollowJdbcTemplateRepositoryTest {

    @Autowired
    FollowJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindByFollowerId() {

    }

    @Test
    void shouldDelete() throws DataAccessException {
        assertTrue(repository.deleteByFollowerIdAndVendorId(1, 2));
    }

    @Test
    void shouldNotDeleteNonExisting() throws DataAccessException {
        assertFalse(repository.deleteByFollowerIdAndVendorId(14, 13));
    }
}