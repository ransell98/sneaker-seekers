package learn.sneaker_seekers.domain;

import learn.sneaker_seekers.data.DataAccessException;
import learn.sneaker_seekers.data.FollowRepository;
import learn.sneaker_seekers.models.Brand;
import learn.sneaker_seekers.models.Favorite;
import learn.sneaker_seekers.models.Follow;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class FollowServiceTest {
    @MockBean
    FollowRepository repository;

    @Autowired
    FollowService service;

    @Test
    void shouldFindByAppUserId() {
        List<Follow> expected = service.findByFollowerId(1);
        when(repository.findByFollowerId(1)).thenReturn(expected);
        List<Follow> actual = service.findByFollowerId(1);
        assertEquals(expected, actual);
    }

    @Test
    void shouldNotFakeFindByAppUserId() {
        List<Follow> expected = service.findByFollowerId(13);
        when(repository.findByFollowerId(13)).thenReturn(expected);
        List<Follow> actual = service.findByFollowerId(13);
        assertEquals(expected, actual);
    }

    @Test
    void shouldAdd() throws DataAccessException {
        Follow follow = makeFollow();
        Follow mockFollow = makeFollow();

        when(repository.add(follow)).thenReturn(mockFollow);

        Result<Brand> actual = service.add(follow);
        assertEquals(ResultType.SUCCESS, actual.getStatus());
        assertEquals(mockFollow, actual.getPayload());
    }

    @Test
    void shouldNotAddInvalid() throws DataAccessException {
        Follow follow = new Follow();
        follow.setFollowerId(0);
        follow.setVendorId(0);

        Result<Favorite> actual = service.add(follow);
        assertEquals(ResultType.INVALID, actual.getStatus());
    }

    @Test
    void shouldNotAddNull() throws DataAccessException {
        Result<Follow> result = service.add(null);
        assertEquals(ResultType.INVALID, result.getStatus());
        assertNull(result.getPayload());
    }

    @Test
    void shouldDeleteById() throws DataAccessException {
        when(repository.deleteByFollowerIdAndVendorId(1, 2)).thenReturn(true);
        boolean success = service.deleteByFollowerIdAndVendorId(1, 2);
        assertTrue(success);
    }

    @Test
    void shouldNotDeleteMissingId() throws DataAccessException {
        boolean success = service.deleteByFollowerIdAndVendorId(30, 51);
        assertFalse(success);
    }

    Follow makeFollow() {
        Follow follow = new Follow();
        follow.setFollowerId(2);
        follow.setVendorId(1);
        return follow;
    }
}