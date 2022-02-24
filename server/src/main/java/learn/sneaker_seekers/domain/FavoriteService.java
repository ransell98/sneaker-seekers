package learn.sneaker_seekers.domain;

import learn.sneaker_seekers.data.DataAccessException;
import learn.sneaker_seekers.data.FavoriteRepository;
import learn.sneaker_seekers.models.Favorite;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteService {
    private final FavoriteRepository repository;

    public FavoriteService(FavoriteRepository repository) { this.repository = repository; }

    public List<Favorite> findByAppUserId(int appUserId) {
        return repository.findByAppUserId(appUserId);
    }

    public Result add(Favorite favorite) throws DataAccessException {
        Result result = validate(favorite);
        if (!result.isSuccess()) {
            return result;
        }

        if (favorite.getFavoriteId() != 0) {
            result.addErrorMessage("Favorite ID must not be set for add.");
            return result;
        }

        favorite = repository.add(favorite);
        result.setPayload(favorite);
        return result;
    }

    public boolean deleteByFavoriteId(int favoriteId) throws DataAccessException {
        if (favoriteId <= 0){
            return false;
        }

        return repository.deleteByFavoriteId(favoriteId);
    }

    private Result<Favorite> validate(Favorite favorite){
        Result<Favorite> result = new Result();

        if (favorite == null) {
            result.addMessage("Favorite cannot be null.", ResultType.INVALID);
            return result;
        }

        if (favorite.getStyle().getStyleId() == 0) {
            result.addMessage("Style cannot be null", ResultType.INVALID);
        }

        if (favorite.getAppUser().getId() == 0) {
            result.addMessage("App User cannot be null", ResultType.INVALID);
        }

        return result;
    }
}
