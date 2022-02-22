package learn.sneaker_seekers.controllers;

import learn.sneaker_seekers.data.DataAccessException;
import learn.sneaker_seekers.domain.EventService;
import learn.sneaker_seekers.domain.Result;
import learn.sneaker_seekers.models.Condition;
import learn.sneaker_seekers.models.Event;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/sneakerseekers/event")
public class EventController {
    private final EventService service;

    public EventController(EventService service) { this.service = service; }

    @GetMapping
    public List<Event> findAll() { return service.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Event> findByEventId(@PathVariable int id) throws DataAccessException {
        Event event = service.findByEventId(id);
        if (event == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(event);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Event event) throws DataAccessException {
        Result<Event> result = service.add(event);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

}
