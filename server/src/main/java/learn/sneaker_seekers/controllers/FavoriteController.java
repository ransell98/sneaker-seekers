package learn.sneaker_seekers.controllers;

import learn.sneaker_seekers.data.DataAccessException;
import learn.sneaker_seekers.domain.BrandService;
import learn.sneaker_seekers.domain.FavoriteService;
import learn.sneaker_seekers.domain.Result;
import learn.sneaker_seekers.domain.StyleService;
import learn.sneaker_seekers.models.*;
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
    private final BrandService brandService;
    private final StyleService styleService;

    public FavoriteController(FavoriteService service, BrandService brandService, StyleService styleService) {
        this.service = service;
        this.brandService = brandService;
        this.styleService = styleService;
    }

    @GetMapping
    public ResponseEntity<List<Favorite>> findByAppUserId(@AuthenticationPrincipal AppUser user) throws DataAccessException {
        List<Favorite> favorites = service.findByAppUserId(user.getId());
        if (favorites == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(favorites);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Style style, @AuthenticationPrincipal AppUser user) throws DataAccessException {
        Favorite favorite = new Favorite();
        favorite.setAppUser(user);

        if (style.getStyleId() > 0) {
            Style populatedStyle = styleService.findByStyleId(style.getStyleId());
            style.setExternalStyleId(populatedStyle.getExternalStyleId());
            style.setStyleName(populatedStyle.getStyleName());
            style.setBrand(populatedStyle.getBrand());
            style.setDescription(populatedStyle.getDescription());
            style.setReleaseYear(populatedStyle.getReleaseYear());
            style.setColorway(populatedStyle.getColorway());
            style.setStyleImage(populatedStyle.getStyleImage());
        } else {
            Brand brand = brandService.findByBrandName(style.getBrand().getBrandName());
            style.setBrand(brand);
        }


        favorite.setStyle(style);


        Result<Favorite> result = service.add(favorite);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }
    /*
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

     */

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteByFavoriteId(@PathVariable int id) throws DataAccessException {
        boolean success = service.deleteByFavoriteId(id);
        if (success) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
