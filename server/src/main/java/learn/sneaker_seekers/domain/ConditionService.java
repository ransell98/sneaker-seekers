package learn.sneaker_seekers.domain;

import learn.sneaker_seekers.data.ConditionRepository;
import learn.sneaker_seekers.models.Condition;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConditionService {
    private final ConditionRepository repository;

    public ConditionService(ConditionRepository repository) { this.repository = repository; }

    public List<Condition> findAll() { return repository.findAll(); }
}
