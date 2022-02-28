package learn.sneaker_seekers.controllers;

import learn.sneaker_seekers.data.DataAccessException;
import learn.sneaker_seekers.domain.FavoriteService;
import learn.sneaker_seekers.domain.Result;
import learn.sneaker_seekers.models.AppUser;
import learn.sneaker_seekers.models.Event;
import learn.sneaker_seekers.models.Favorite;
import learn.sneaker_seekers.models.Style;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/sneakerseekers/favorite")
public class FavoriteController {
    private final FavoriteService service;

    public FavoriteController(FavoriteService service) { this.service = service; }

    @GetMapping
    public ResponseEntity<List<Favorite>> findAll() {
        List<Favorite> favorites = service.findAll();
        if (favorites == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(favorites);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<Favorite>> findByAppUserId(@PathVariable int id) throws DataAccessException {
        List<Favorite> favorites = service.findByAppUserId(id);
        if (favorites == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(favorites);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Style style, @AuthenticationPrincipal AppUser user) throws DataAccessException {
        Favorite favorite = new Favorite();
        favorite.setStyle(style);
        favorite.setAppUser(user);


        Result<Favorite> result = service.add(favorite);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteByFavoriteId(@PathVariable int id) throws DataAccessException {
        boolean success = service.deleteByFavoriteId(id);
        if (success) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
