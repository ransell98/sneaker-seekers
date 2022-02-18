package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Location;

import java.util.List;

public interface LocationRepository {

    List<Location> findAll();

    Location findByLocationId(int locationId);

    Location add(Location location) throws DataAccessException;

}
