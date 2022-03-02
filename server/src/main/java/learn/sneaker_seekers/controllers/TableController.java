package learn.sneaker_seekers.controllers;

import learn.sneaker_seekers.data.DataAccessException;
import learn.sneaker_seekers.domain.Result;
import learn.sneaker_seekers.domain.TableService;
import learn.sneaker_seekers.models.AppUser;
import learn.sneaker_seekers.models.Table;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/sneakerseekers/table")
public class TableController {
    private final TableService service;

    public TableController(TableService service) { this.service = service; }

    @GetMapping("/{id}")
    public ResponseEntity<List<Table>> findByEventId(@PathVariable int id) throws DataAccessException {
        List<Table> tables = service.findByEventId(id);
        if (tables == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(tables);
    }

    @PostMapping
<<<<<<< HEAD
    public ResponseEntity<Object> add(@RequestBody Table table, @AuthenticationPrincipal AppUser user) throws DataAccessException {
        table.setAppUser(user);
=======
    public ResponseEntity<Object> add(@RequestBody Table table, @AuthenticationPrincipal AppUser appUser) throws DataAccessException {
        table.setAppUser(appUser);
>>>>>>> 7e861823caca7ee9515fbd99022c47dd5d369814
        Result<Table> result = service.add(table);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable int id, @RequestBody Table table) throws DataAccessException {
        Result result = service.update(table);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }
}
