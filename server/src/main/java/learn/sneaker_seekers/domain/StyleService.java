package learn.sneaker_seekers.domain;

import learn.sneaker_seekers.data.StyleRepository;
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

    private Result<Style> validate(Style style) {
        Result<Style> result = new Result();

        if (style == null) {
            result.addMessage("Style cannot be null.", ResultType.INVALID);
            return result;
        }

        if (Validations.isNullOrBlank(style.getStyleName())) {
            result.addMessage("Style name is required.", ResultType.INVALID);
        }

        if (Validations.isNullOrBlank(style.getDescription())) {
            result.addMessage("Description of style is required.", ResultType.INVALID);
        }

        if (style.getReleaseYear() <= 0) {
            result.addMessage("Release year is required.", ResultType.INVALID);
        }

        if (style.getBrandId() < 0) {
            result.addMessage("Brand is required.", ResultType.INVALID);
        }

        return result;
    }
}
