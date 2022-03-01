package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Brand;

import java.util.List;

public interface BrandRepository {

    List<Brand> findAll();

    Brand findByBrandName(String brandName) throws DataAccessException;

    Brand add(Brand brand) throws DataAccessException;

}
