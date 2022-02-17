package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Style;

public interface StyleRepository {

    Style findByStyleId(int styleId);

}
