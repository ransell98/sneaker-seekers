package learn.sneaker_seekers.domain;

import learn.sneaker_seekers.data.DataAccessException;
import learn.sneaker_seekers.data.FavoriteRepository;
import learn.sneaker_seekers.models.Favorite;
import learn.sneaker_seekers.models.Style;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteService {
    private final FavoriteRepository repository;

    private final StyleService service;

    public FavoriteService(FavoriteRepository repository, StyleService service) {
        this.repository = repository;
        this.service = service;
    }

    public List<Favorite> findAll() { return repository.findAll(); }

    public List<Favorite> findByAppUserId(int appUserId) {
        return repository.findByAppUserId(appUserId);
    }

    public Result add(Favorite favorite) throws DataAccessException {
        Result result = validate(favorite);
        if (!result.isSuccess()) {
            return result;
        }

        // if style id is 0, create style
        if (favorite.getStyle().getStyleId() == 0) {
            Style style = new Style(
                    0,
                    null,
                    favorite.getStyle().getStyleName(),
                    favorite.getStyle().getBrand(),
                    favorite.getStyle().getDescription(),
                    favorite.getStyle().getReleaseYear(),
                    favorite.getStyle().getColorway(),
                    favorite.getStyle().getStyleImage());

            service.add(style);
        } else {
            Style style = service.findByStyleId(favorite.getStyle().getStyleId());
            favorite.setStyle(style);
            favorite = repository.add(favorite);
            result.setPayload(favorite);
            return result;
        }
        // if not, use style service to get style
        // if exists, add style

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

        if (favorite.getStyle().getStyleId() < 0) {
            result.addMessage("Style cannot be null", ResultType.INVALID);
        }

        if (favorite.getAppUser().getId() == 0) {
            result.addMessage("App User cannot be null", ResultType.INVALID);
        }

        return result;
    }
}
