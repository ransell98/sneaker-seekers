package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Style;

public interface StyleRepository {

    Style findByStyleId(int styleId) throws DataAccessException;

    Style findByExternalStyleId(String externalStyleId);

    Style add(Style style);


}
