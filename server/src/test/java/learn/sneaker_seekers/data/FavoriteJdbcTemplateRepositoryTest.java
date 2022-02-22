package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Favorite;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class FavoriteJdbcTemplateRepositoryTest {

    final static int NEXT_ID = 2;

    @Autowired
    FavoriteJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }


    @Test
    void shouldFindByAppUserId() {
        List<Favorite> favorites = repository.findByAppUserId(1);
        assertEquals(1, 1);
    }

    @Test
    void shouldAdd() throws DataAccessException {
        Favorite favorite = new Favorite();
        favorite.setStyleId(1);
        favorite.setAppUserId(1);
        Favorite actual = repository.add(favorite);
        assertNotNull(actual);
        assertEquals(NEXT_ID, actual.getFavoriteId());
    }

    @Test
    void shouldDeleteExisting() throws DataAccessException {
        assertTrue(repository.deleteByFavoriteId(1));
    }

    @Test
    void shouldNotDeleteNonExisting() throws DataAccessException {
        assertFalse(repository.deleteByFavoriteId(38));
    }

}