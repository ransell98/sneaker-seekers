package learn.sneaker_seekers.controllers;


import learn.sneaker_seekers.domain.AppUserService;
import learn.sneaker_seekers.models.AppUser;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@ConditionalOnWebApplication
public class AppUserController {

    private final AppUserService service;

    public AppUserController(AppUserService service) {
        this.service = service;
    }

    @GetMapping("/user")
    public List<AppUser> findAll() {
        return service.findAll();
    }

    @GetMapping("/user/role")
    public List<String> findAllRoles() {
        return service.findAllRoles();
    }

    @GetMapping("/user/{username}")
    public AppUser findByUsername(@PathVariable String username) {
        return service.findByUserName(username);
    }

    @PostMapping("/user/create")
    public ResponseEntity<Object> create(@RequestBody AppUser user) {

        var result = service.add(user);
        if (!result.isSuccess()) {
            return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/user/update")
    public ResponseEntity<Object> update(
            @RequestBody AppUser user,
            @AuthenticationPrincipal AppUser principal) {

        // can't update if not an admin
        if (!principal.hasAuthority("ADMIN")) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        // don't bother updating a user that doesn't exist
        var existing = service.findByUserName(user.getUsername());
        if (existing == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // can't update another ADMIN
        if (existing.isEnabled() && existing.hasAuthority("ADMIN")
                && existing.getId() != principal.getId()) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        var result = service.update(user);
        if (!result.isSuccess()) {
            return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/user/password")
    public ResponseEntity<Object> changePassword(
            @RequestBody HashMap<String, String> values,
            @AuthenticationPrincipal AppUser principal) {

        // can only update our own password, never someone else's
        principal.setPassword(values.get("password"));

        var result = service.changePassword(principal);
        if (!result.isSuccess()) {
            return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
