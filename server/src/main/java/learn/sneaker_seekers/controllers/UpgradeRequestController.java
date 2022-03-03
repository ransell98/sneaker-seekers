package learn.sneaker_seekers.controllers;

import learn.sneaker_seekers.App;
import learn.sneaker_seekers.data.DataAccessException;
import learn.sneaker_seekers.domain.AppUserService;
import learn.sneaker_seekers.domain.Result;
import learn.sneaker_seekers.domain.UpgradeRequestService;
import learn.sneaker_seekers.models.AppUser;
import learn.sneaker_seekers.models.UpgradeRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/sneakerseekers/upgraderequest")
public class UpgradeRequestController {
    private final UpgradeRequestService service;
    private final AppUserService appUserService;

    public UpgradeRequestController(UpgradeRequestService service, AppUserService appUserService) { this.service = service; this.appUserService = appUserService; }

    @GetMapping
    public List<UpgradeRequest> findAll() {
        return service.findAll();
    }

    @PostMapping
    public ResponseEntity<Object> add(@AuthenticationPrincipal AppUser user) throws DataAccessException {
        UpgradeRequest upgradeRequest = new UpgradeRequest();
        upgradeRequest.setAppUser(user);
        Result<UpgradeRequest> result = service.add(upgradeRequest);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping
    public ResponseEntity<Object> acceptUpgradeRequest (@RequestBody UpgradeRequest request) throws DataAccessException {
        AppUser user = request.getAppUser();
        user = appUserService.findByUserName(user.getUsername());
        List<String> authoritiesList = user.getAuthorityNames();
        authoritiesList.add("VENDOR");
        user.setAuthorityNames(authoritiesList);

        Result<AppUser> updateResult = appUserService.update(user);
        if (!updateResult.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }

        boolean success = service.deleteByUpgradeRequestId(request.getUpgradeRequestId());
        if (success) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
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
