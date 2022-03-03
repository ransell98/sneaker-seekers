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

    @GetMapping("/{externalStyleId}")
    public ResponseEntity<Void> findIfExisting(@PathVariable String externalStyleId, @AuthenticationPrincipal AppUser user) {
        List<Favorite> favorites = service.findByAppUserId(user.getId());
        Boolean isAlreadyAFavorite = false;
        for (Favorite favorite : favorites) {
            if (favorite.getStyle().getExternalStyleId() == externalStyleId) {
                isAlreadyAFavorite = true;
            }
        }
        if (!isAlreadyAFavorite) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
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
            Result<Brand> result = brandService.add(style.getBrand());
            style.setBrand(result.getPayload());
        }

        favorite.setStyle(style);

        Result<Favorite> result = service.add(favorite);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }


    @DeleteMapping
    public ResponseEntity<Void> deleteByFavoriteId(@RequestBody Style style, @AuthenticationPrincipal AppUser user) throws DataAccessException {
        Style populatedStyle = styleService.findByExternalStyleId(style.getExternalStyleId());
        style = populatedStyle;

        Favorite favorite = new Favorite();
        favorite.setAppUser(user);
        favorite.setStyle(style);

        Favorite populatedFavorite = service.findByAppUserIdAndStyleId(favorite.getAppUser().getId(), favorite.getStyle().getStyleId());
        favorite = populatedFavorite;


        boolean success = service.delete(favorite);
        if (success) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
