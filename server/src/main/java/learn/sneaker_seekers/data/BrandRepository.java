package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Brand;

import java.util.List;

public interface BrandRepository {

    List<Brand> findAll();

    Brand add(Brand brand) throws DataAccessException;

}
