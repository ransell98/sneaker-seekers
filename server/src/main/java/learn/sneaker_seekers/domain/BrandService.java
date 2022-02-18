package learn.sneaker_seekers.domain;

import learn.sneaker_seekers.data.BrandRepository;
import learn.sneaker_seekers.data.DataAccessException;
import learn.sneaker_seekers.models.Brand;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrandService {
    private final BrandRepository repository;

    public BrandService(BrandRepository repository) { this.repository = repository; }

    public List<Brand> findAll() {
        return repository.findAll();
    }

    public Result add(Brand brand) throws DataAccessException {
        Result result = validate(brand);
        if (!result.isSuccess()) {
            return result;
        }

        if (brand.getBrandId() != 0){
            result.addErrorMessage("Brand ID must not be set for add.");
            return result;
        }

        brand = repository.add(brand);
        result.setPayload(brand);
        return result;
    }

    private Result validate(Brand brand) {
        Result result = new Result();

        if (brand == null) {
            result.addErrorMessage("Brand cannot be null.");
        }

        if (brand.getBrandName() == null) {
            result.addErrorMessage("Brand name cannot be null.");
        }

        return result;
    }

}
