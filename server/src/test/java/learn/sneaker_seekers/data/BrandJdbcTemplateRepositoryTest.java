package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Brand;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class BrandJdbcTemplateRepositoryTest {

    @Autowired
    BrandJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<Brand> brand = repository.findAll();
        assertNotNull(brand);
        assertTrue(brand.size() >= 2);
    }

    @Test
    void shouldAdd() throws DataAccessException {
        Brand brand = new Brand();
        brand.setBrandName("Puma");

        Brand actual = repository.add(brand);
        brand.setBrandId(3);

        assertNotNull(actual);
        assertEquals(brand, actual);
    }
}