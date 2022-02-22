package learn.sneaker_seekers.controllers;

import learn.sneaker_seekers.domain.ConditionService;
import learn.sneaker_seekers.models.Brand;
import learn.sneaker_seekers.models.Condition;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/sneakerseekers/condition")
public class ConditionController {
    private final ConditionService service;

    public ConditionController(ConditionService service) { this.service = service; }

    @GetMapping
    public List<Condition> findAll() { return service.findAll(); }
}
