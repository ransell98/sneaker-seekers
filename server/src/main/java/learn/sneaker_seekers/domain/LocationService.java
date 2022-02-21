package learn.sneaker_seekers.domain;

import learn.sneaker_seekers.data.DataAccessException;
import learn.sneaker_seekers.data.LocationRepository;
import learn.sneaker_seekers.models.Event;
import learn.sneaker_seekers.models.Location;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class LocationService {
    private final LocationRepository repository;

    public LocationService(LocationRepository repository) { this.repository = repository; }

    public List<Location> findAll() { return repository.findAll(); }

    public Location findByLocationId(int locationId) { return repository.findByLocationId(locationId); }

    public Result add(Location location) throws DataAccessException {
        Result result = validate(location);
        if (!result.isSuccess()) {
            return result;
        }

        if (location.getLocationId() != 0) {
            result.addErrorMessage("Location ID must not be set for add.");
            return result;
        }

        location = repository.add(location);
        result.setPayload(location);
        return result;
    }

    private Result validate(Location location) {
        Result result = new Result();

        if (location == null) {
            result.addErrorMessage("Location cannot be null.");
        }

        return result;
    }
}
