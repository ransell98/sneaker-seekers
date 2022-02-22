package learn.sneaker_seekers.controllers;

import learn.sneaker_seekers.data.DataAccessException;
import learn.sneaker_seekers.domain.LocationService;
import learn.sneaker_seekers.domain.Result;
import learn.sneaker_seekers.models.Event;
import learn.sneaker_seekers.models.Favorite;
import learn.sneaker_seekers.models.Location;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/sneakerseekers/location")
public class LocationController {
    private final LocationService service;

    public LocationController(LocationService service) { this.service = service; }

    @GetMapping
    public List<Location> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Location> findByLocationId(@PathVariable int id) throws DataAccessException {
        Location location = service.findByLocationId(id);
        if (location == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(location);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Location location) throws DataAccessException {
        Result<Location> result = service.add(location);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }
}
