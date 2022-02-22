package learn.sneaker_seekers.domain;

import learn.sneaker_seekers.data.BrandRepository;
import learn.sneaker_seekers.models.Brand;
import org.junit.jupiter.api.Test;
import org.mockito.stubbing.OngoingStubbing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class BrandServiceTest {

    @Autowired
    BrandService service;

    @MockBean
    BrandRepository repository;

    /*@Test
    void shouldFindAll() {
        List<Brand> expected = service.findAll();
        when(repository.findAll()).thenReturn(expected);
        List<Brand> actual = service.findAll();
        assertEquals(expected, actual);
    }*/


}