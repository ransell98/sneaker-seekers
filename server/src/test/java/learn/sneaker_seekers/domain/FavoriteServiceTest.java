package learn.sneaker_seekers.domain;


import learn.sneaker_seekers.data.DataAccessException;
import learn.sneaker_seekers.data.FavoriteRepository;
import learn.sneaker_seekers.models.Brand;
import learn.sneaker_seekers.models.Favorite;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class FavoriteServiceTest {

    @MockBean
    FavoriteRepository repository;

    @Autowired
    FavoriteService service;

    @Test
    void shouldFindByAppUserId() {
        List<Favorite> expected = service.findByAppUserId(1);
        when(repository.findByAppUserId(1)).thenReturn(expected);
        List<Favorite> actual = service.findByAppUserId(1);
        assertEquals(expected, actual);
    }

    @Test
    void shouldNotFakeFindByAppUserId() {
        List<Favorite> expected = service.findByAppUserId(13);
        when(repository.findByAppUserId(13)).thenReturn(expected);
        List<Favorite> actual = service.findByAppUserId(13);
        assertEquals(expected, actual);
    }

    @Test
    void shouldAdd() throws DataAccessException {
        Favorite favorite = makeFavorite();
        Favorite mockFavorite = makeFavorite();

        when(repository.add(favorite)).thenReturn(mockFavorite);

        Result<Brand> actual = service.add(favorite);
        assertEquals(ResultType.SUCCESS, actual.getStatus());
        assertEquals(mockFavorite, actual.getPayload());
    }

    @Test
    void shouldNotAddInvalid() throws DataAccessException {
        Favorite favorite = new Favorite();
        favorite.setStyleId(0);
        favorite.setAppUserId(0);

        Result<Favorite> actual = service.add(favorite);
        assertEquals(ResultType.INVALID, actual.getStatus());
    }

    @Test
    void shouldDeleteById() throws DataAccessException {
        int favoriteId = 1;
        Result<Boolean> result = new Result<>();
        result.setPayload(service.deleteByFavoriteId(favoriteId));
        assertEquals(true, result.getPayload());
    }

    Favorite makeFavorite() {
        Favorite favorite = new Favorite();
        favorite.setStyleId(2);
        favorite.setAppUserId(2);
        return favorite;
    }

}