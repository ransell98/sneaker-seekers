package learn.sneaker_seekers.domain;

import learn.sneaker_seekers.data.BrandRepository;
import learn.sneaker_seekers.data.ConditionRepository;
import learn.sneaker_seekers.models.Brand;
import learn.sneaker_seekers.models.Condition;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class ConditionServiceTest {

    @MockBean
    ConditionRepository repository;

    @Autowired
    ConditionService service;

    @Test
    void shouldFindAll() {
        List<Condition> expected = service.findAll();
        when(repository.findAll()).thenReturn(expected);
        List<Condition> actual = service.findAll();
        assertEquals(expected, actual);
    }

}