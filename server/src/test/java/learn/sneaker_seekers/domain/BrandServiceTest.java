package learn.sneaker_seekers.domain;

import learn.sneaker_seekers.data.BrandRepository;
import learn.sneaker_seekers.data.DataAccessException;
import learn.sneaker_seekers.models.Brand;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class BrandServiceTest {

    @MockBean
    BrandRepository repository;

    @Autowired
    BrandService service;

    @Test
    void shouldFindAll() {
        List<Brand> expected = service.findAll();
        when(repository.findAll()).thenReturn(expected);
        List<Brand> actual = service.findAll();
        assertEquals(expected, actual);
    }

    @Test
    void shouldNotAddWhenInvalid() throws DataAccessException {
        Brand brand = new Brand();
        brand.setBrandName(null);
        Result<Brand> actual = service.add(brand);
        assertEquals(ResultType.INVALID, actual.getStatus());
    }

    @Test
    void shouldAdd() throws DataAccessException {
        Brand brand = makeBrand();
        Brand mockBrand = makeBrand();

        when(repository.add(brand)).thenReturn(mockBrand);

        Result<Brand> actual = service.add(brand);
        assertEquals(ResultType.SUCCESS, actual.getStatus());
        assertEquals(mockBrand, actual.getPayload());
    }

    @Test
    void shouldNotAddNull() throws DataAccessException {
        Result<Brand> result = service.add(null);
        assertEquals(ResultType.INVALID, result.getStatus());
        assertNull(result.getPayload());
    }

    Brand makeBrand() {
        Brand brand = new Brand();
        brand.setBrandName("Jordan");
        return brand;
    }

}