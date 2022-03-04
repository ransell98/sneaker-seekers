package learn.sneaker_seekers.domain;

import learn.sneaker_seekers.data.BrandRepository;
import learn.sneaker_seekers.data.DataAccessException;
import learn.sneaker_seekers.data.StyleRepository;
import learn.sneaker_seekers.models.Brand;
import learn.sneaker_seekers.models.Style;
import org.springframework.stereotype.Service;

@Service
public class StyleService {
    private final StyleRepository repository;
    private final BrandRepository brandRepository;

    public StyleService(StyleRepository repository, BrandRepository brandRepository) {
        this.repository = repository;
        this.brandRepository = brandRepository;
    }

    public Style findByStyleId(int styleId) throws DataAccessException { return repository.findByStyleId(styleId); }

    public Style findByExternalStyleId(String externalStyleId) { return repository.findByExternalStyleId(externalStyleId); }

    public Result add(Style style) throws DataAccessException{
        Result result = validate(style);
        if (!result.isSuccess()) {
            result.setPayload(style);
            return result;
        }

        style = repository.add(style);
        result.setPayload(style);
        return result;
    }

    private Result<Style> validate(Style style) throws DataAccessException {
        Result<Style> result = new Result();

        Style foundStyle = repository.findByExternalStyleId(style.getExternalStyleId());

        if (repository.findByExternalStyleId(style.getExternalStyleId()) != null){
            result.addErrorMessage("Style already exists in the database.");
            return result;
        }

        if (style == null) {
            result.addMessage("Style cannot be null.", ResultType.INVALID);
            return result;
        }

        if (Validations.isNullOrBlank(style.getStyleName())) {
            result.addMessage("Style name is required.", ResultType.INVALID);
            return result;
        }

        /*
        if (Validations.isNullOrBlank(style.getDescription())) {
            result.addMessage("Description of style is required.", ResultType.INVALID);
            return result;
        }



        if (style.getReleaseYear() == null) {
            result.addMessage("Release year is required.", ResultType.INVALID);
            return result;
        }


         */
        if (style.getBrand().getBrandId() < 0) {
            result.addMessage("Brand is required.", ResultType.INVALID);
        }

        if (style.getBrand().getBrandId() == 0) {
            Brand brand = brandRepository.findByBrandName(style.getBrand().getBrandName());
            if (brand == null){
                style.setBrand(brandRepository.add(style.getBrand()));
            } else {
                style.setBrand(brand);
            }
        }

        return result;
    }
}
