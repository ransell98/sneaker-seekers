package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Condition;
import learn.sneaker_seekers.models.Listing;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class ListingJdbcTemplateRepositoryTest {

    @Autowired
    ListingJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindByTableId() {
        List<Listing> listing = repository.findByTableId(2);
        assertEquals(1, 1);
    }

    @Test
    void shouldAdd() {

    }
}