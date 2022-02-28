package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Favorite;

import java.util.List;

public interface FavoriteRepository {

    List<Favorite> findAll();

    List<Favorite> findByAppUserId(int appUserId);

    Favorite add(Favorite favorite) throws DataAccessException;

    boolean deleteByFavoriteId(int favoriteId) throws DataAccessException;

    boolean isStyleAdded(String styleId) throws DataAccessException;

}
