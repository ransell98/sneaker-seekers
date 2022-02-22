package learn.sneaker_seekers.controllers;

import learn.sneaker_seekers.data.DataAccessException;
import learn.sneaker_seekers.domain.FollowService;
import learn.sneaker_seekers.domain.Result;
import learn.sneaker_seekers.models.Favorite;
import learn.sneaker_seekers.models.Follow;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/sneakerseekers/follow")
public class FollowController {
    private final FollowService service;

    public FollowController(FollowService service) { this.service = service; }

    @GetMapping("/{id}")
    public ResponseEntity<List<Follow>> findByFollwerId(@PathVariable int id) throws DataAccessException {
        List<Follow> follows = service.findByFollowerId(id);
        if (follows == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(follows);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Follow follow) throws DataAccessException {
        Result<Follow> result = service.add(follow);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{followerId}/{vendorId}")
    public ResponseEntity<Void> deleteByFollowerIdAndVendorId(@PathVariable int followerId, @PathVariable int vendorId) throws DataAccessException {
        boolean success = service.deleteByFollowerIdAndVendorId(followerId, vendorId);
        if (success) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
