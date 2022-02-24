package learn.sneaker_seekers.domain;

import learn.sneaker_seekers.data.DataAccessException;
import learn.sneaker_seekers.data.UpgradeRequestRepository;
import learn.sneaker_seekers.models.AppUser;
import learn.sneaker_seekers.models.UpgradeRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class UpgradeRequestServiceTest {

    @MockBean
    UpgradeRequestRepository repository;

    @Autowired
    UpgradeRequestService service;

    @Test
    void shouldFindAll() {
        List<UpgradeRequest> expected = service.findAll();
        when(repository.findAll()).thenReturn(expected);
        List<UpgradeRequest> actual = service.findAll();
        assertEquals(expected, actual);
    }

    @Test
    void shouldAdd() throws DataAccessException {
        UpgradeRequest upgradeRequest = makeUpgrade();
        UpgradeRequest mockUpgrade = makeUpgrade();
        when(repository.add(upgradeRequest)).thenReturn(mockUpgrade);
        Result<UpgradeRequest> actual = service.add(upgradeRequest);
        assertEquals(ResultType.SUCCESS, actual.getStatus());
        assertEquals(mockUpgrade, actual.getPayload());
    }

    @Test
    void shouldNotAddNull() throws DataAccessException {
        Result<UpgradeRequest> result = service.add(null);
        assertEquals(ResultType.INVALID, result.getStatus());
        assertNull(result.getPayload());
    }

    @Test
    void shouldDelete() throws DataAccessException {
        when(repository.deleteByUpgradeRequestId(1)).thenReturn(true);
        assertTrue(service.deleteByUpgradeRequestId(1));
    }

    @Test
    void shouldNotDeleteMissing() throws DataAccessException {
        when(repository.deleteByUpgradeRequestId(789)).thenReturn(false);
        assertFalse(service.deleteByUpgradeRequestId(789));
    }

    UpgradeRequest makeUpgrade() {
        UpgradeRequest upgradeRequest = new UpgradeRequest();

        AppUser appUser = new AppUser();
        appUser.setId(2);
        upgradeRequest.setAppUserId(appUser);

        return upgradeRequest;
    }

}