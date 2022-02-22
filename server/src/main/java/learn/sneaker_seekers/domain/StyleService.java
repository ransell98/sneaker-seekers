package learn.sneaker_seekers.domain;

import learn.sneaker_seekers.data.DataAccessException;
import learn.sneaker_seekers.data.EventRepository;
import learn.sneaker_seekers.data.StyleRepository;
import learn.sneaker_seekers.models.Listing;
import learn.sneaker_seekers.models.Style;
import org.springframework.stereotype.Service;

@Service
public class StyleService {
    private final StyleRepository repository;

    public StyleService(StyleRepository repository) { this.repository = repository; }

    public Style findByStyleId(int styleId) { return repository.findByStyleId(styleId); }

    public Result add(Style style) {
        Result result = validate(style);
        if (!result.isSuccess()) {
            return result;
        }

        style = repository.add(style);
        result.setPayload(style);
        return result;
    }

    private Result validate(Style style) {
        Result result = new Result();

        if (style == null) {
            result.addErrorMessage("Style cannot be null.");
        }

        return result;
    }
}
