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

    public Brand findByBrandName(String brandName) throws DataAccessException { return repository.findByBrandName(brandName); }

    public Result add(Brand brand) throws DataAccessException {
        Result result = validate(brand);
        if (!result.isSuccess()) {
            return result;
        }

        if (brand.getBrandId() != 0){
            result.addMessage("Brand ID must not be set for add.", ResultType.INVALID);
            return result;
        }

        brand = repository.add(brand);
        result.setPayload(brand);
        return result;
    }

    private Result<Brand> validate(Brand brand) {
        Result<Brand> result = new Result();

        if (brand == null) {
            result.addMessage("Brand cannot be null.", ResultType.INVALID);
            return result;
        }

        if (Validations.isNullOrBlank(brand.getBrandName())) {
            result.addMessage("Brand name is required.", ResultType.INVALID);
        }

        return result;
    }

}
