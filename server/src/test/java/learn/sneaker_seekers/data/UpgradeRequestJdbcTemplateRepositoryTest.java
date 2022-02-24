package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.AppUser;
import learn.sneaker_seekers.models.UpgradeRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class UpgradeRequestJdbcTemplateRepositoryTest {

    final static int NEXT_ID = 2;

    @Autowired
    UpgradeRequestJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<UpgradeRequest> upgradeRequest = repository.findAll();
        assertNotNull(upgradeRequest);
        assertTrue(upgradeRequest.size() >= 1);
    }

    @Test
    void shouldAdd() throws DataAccessException {
        UpgradeRequest upgradeRequest = new UpgradeRequest();

        AppUser appUser = new AppUser();
        appUser.setId(2);
        upgradeRequest.setAppUserId(appUser);

        UpgradeRequest actual = repository.add(upgradeRequest);
        assertNotNull(actual);
        assertEquals(NEXT_ID, actual.getAppUserId());
    }

    @Test
    void shouldDeleteExisting() throws DataAccessException {
        assertTrue(repository.deleteByUpgradeRequestId(1));
    }

    @Test
    void shouldNotDeleteNonExisting() throws DataAccessException {
        assertFalse(repository.deleteByUpgradeRequestId(33));
    }

}