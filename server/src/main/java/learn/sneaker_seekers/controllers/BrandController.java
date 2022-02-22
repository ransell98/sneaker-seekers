package learn.sneaker_seekers.controllers;

import learn.sneaker_seekers.data.DataAccessException;
import learn.sneaker_seekers.domain.BrandService;
import learn.sneaker_seekers.domain.Result;
import learn.sneaker_seekers.models.Brand;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/sneakerseekers/brand")
public class BrandController {
    private final BrandService service;

    public BrandController(BrandService service) { this.service = service; }

    @GetMapping
    public List<Brand> findAll() { return service.findAll(); }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Brand brand) throws DataAccessException {
        Result<Brand> result = service.add(brand);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }
}
