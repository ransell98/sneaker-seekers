package learn.sneaker_seekers.controllers;

import learn.sneaker_seekers.data.DataAccessException;
import learn.sneaker_seekers.domain.FollowService;
import learn.sneaker_seekers.domain.Result;
import learn.sneaker_seekers.models.AppUser;
import learn.sneaker_seekers.models.Favorite;
import learn.sneaker_seekers.models.Follow;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/sneakerseekers/follow")
public class FollowController {
    private final FollowService service;

    public FollowController(FollowService service) { this.service = service; }

    @GetMapping
    public ResponseEntity<List<Follow>> findByFollowerId(@AuthenticationPrincipal AppUser follower) throws DataAccessException {
        List<Follow> follows = service.findByFollowerId(follower.getId());
        if (follows == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(follows);
    }

    @GetMapping("/{vendorId}")
    public ResponseEntity<Void> findIfExisting(@PathVariable int vendorId, @AuthenticationPrincipal AppUser follower) {
        List<Follow> follows = service.findByFollowerId(follower.getId());
        Boolean isAlreadyFollowed = false;
        for (Follow follow : follows) {
            if (follow.getVendor().getId() == vendorId) {
                isAlreadyFollowed = true;
            }
        }
        if (!isAlreadyFollowed) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody AppUser vendor, @AuthenticationPrincipal AppUser follower) throws DataAccessException {
        Follow follow = new Follow();
        follow.setFollower(follower);
        follow.setVendor(vendor);

        Result<Follow> result = service.add(follow);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{vendorId}")
    public ResponseEntity<Void> deleteByVendorId(@PathVariable int vendorId, @AuthenticationPrincipal AppUser follower) throws DataAccessException {
        int followerId = follower.getId();
        boolean success = service.deleteByFollowerIdAndVendorId(followerId, vendorId);
        if (success) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
