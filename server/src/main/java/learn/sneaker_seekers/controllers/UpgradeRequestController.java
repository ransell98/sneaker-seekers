package learn.sneaker_seekers.controllers;

import learn.sneaker_seekers.data.DataAccessException;
import learn.sneaker_seekers.domain.Result;
import learn.sneaker_seekers.domain.UpgradeRequestService;
import learn.sneaker_seekers.models.Table;
import learn.sneaker_seekers.models.UpgradeRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/sneakerseekers/upgraderequest")
public class UpgradeRequestController {
    private final UpgradeRequestService service;

    public UpgradeRequestController(UpgradeRequestService service) { this.service = service; }

    @GetMapping
    public List<UpgradeRequest> findAll() {
        return service.findAll();
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody UpgradeRequest upgradeRequest) throws DataAccessException {
        Result<UpgradeRequest> result = service.add(upgradeRequest);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteByUpgradeRequestId(@PathVariable int id) throws DataAccessException {
        boolean success = service.deleteByUpgradeRequestId(id);
        if (success) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
