package learn.sneaker_seekers.controllers;

import learn.sneaker_seekers.data.DataAccessException;
import learn.sneaker_seekers.domain.Result;
import learn.sneaker_seekers.domain.StyleService;
import learn.sneaker_seekers.models.Event;
import learn.sneaker_seekers.models.Listing;
import learn.sneaker_seekers.models.Style;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/sneakerseekers/style")
public class StyleController {
    private final StyleService service;

    public StyleController(StyleService service) { this.service = service; }

    @GetMapping("/{id}")
    public ResponseEntity<Style> findByStyleId(@PathVariable int id) throws DataAccessException {
        Style style = service.findByStyleId(id);
        if (style == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(style);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Style style) throws DataAccessException {
        Result<Style> result = service.add(style);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }
}
