package learn.sneaker_seekers.controllers;

import learn.sneaker_seekers.data.DataAccessException;
import learn.sneaker_seekers.domain.BrandService;
import learn.sneaker_seekers.domain.ListingService;
import learn.sneaker_seekers.domain.Result;
import learn.sneaker_seekers.domain.StyleService;
import learn.sneaker_seekers.models.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/sneakerseekers/listing")
public class ListingController {
    private final ListingService service;
    private final BrandService brandService;
    private final StyleService styleService;

    public ListingController(ListingService service, BrandService brandService, StyleService styleService) {
        this.service = service;
        this.brandService = brandService;
        this.styleService = styleService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<Listing>> findByTableId(@PathVariable int id) throws DataAccessException {
        List<Listing> listings = service.findByTableId(id);
        if (listings == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(listings);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Listing listing) throws DataAccessException {

        Result<Brand> brandResult = brandService.add(listing.getStyle().getBrand());
        listing.getStyle().setBrand(brandResult.getPayload());

        Style populatedStyle = styleService.findByExternalStyleId(listing.getStyle().getExternalStyleId());
        listing.setStyle(populatedStyle);

        Result<Listing> result = service.add(listing);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteByListingId(@PathVariable int id) throws DataAccessException {
        boolean success = service.deleteByListingId(id);
        if (success) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
