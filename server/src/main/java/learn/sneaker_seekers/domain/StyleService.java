package learn.sneaker_seekers.domain;

import learn.sneaker_seekers.data.EventRepository;
import learn.sneaker_seekers.data.StyleRepository;
import learn.sneaker_seekers.models.Style;
import org.springframework.stereotype.Service;

@Service
public class StyleService {
    private final StyleRepository repository;

    public StyleService(StyleRepository repository) { this.repository = repository; }

    public Style findByStyleId(int styleId) { return repository.findByStyleId(styleId); }
}
