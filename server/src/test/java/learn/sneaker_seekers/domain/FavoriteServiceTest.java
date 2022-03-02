package learn.sneaker_seekers.domain;


import learn.sneaker_seekers.data.DataAccessException;
import learn.sneaker_seekers.data.FavoriteRepository;
import learn.sneaker_seekers.models.AppUser;
import learn.sneaker_seekers.models.Brand;
import learn.sneaker_seekers.models.Favorite;
import learn.sneaker_seekers.models.Style;
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

        Style style = new Style();
        style.setStyleId(0);
        favorite.setStyle(style);

        AppUser appUser = new AppUser();
        appUser.setId(0);
        favorite.setAppUser(appUser);

        Result<Favorite> actual = service.add(favorite);
        assertEquals(ResultType.INVALID, actual.getStatus());
    }

    @Test
    void shouldNotAddNull() throws DataAccessException {
        Result<Favorite> result = service.add(null);
        assertEquals(ResultType.INVALID, result.getStatus());
        assertNull(result.getPayload());
    }
/*
    @Test
    void shouldDeleteById() throws DataAccessException {
        when(repository.deleteByFavoriteId(1)).thenReturn(true);
        boolean success = service.deleteByFavoriteId(1);
        assertTrue(success);
    }

    @Test
    void shouldNotDeleteMissingId() throws DataAccessException {
        boolean success = service.deleteByFavoriteId(30);
        assertFalse(success);
    }
*/
    Favorite makeFavorite() {
        Favorite favorite = new Favorite();

        Style style = new Style();
        style.setStyleId(2);
        favorite.setStyle(style);

        AppUser appUser = new AppUser();
        appUser.setId(2);
        favorite.setAppUser(appUser);

        return favorite;
    }

}