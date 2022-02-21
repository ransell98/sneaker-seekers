package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Condition;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class ConditionJdbcTemplateRepositoryTest {

    @Autowired
    ConditionJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<Condition> conditionList = repository.findAll();
        assertNotNull(conditionList);
        assertTrue(conditionList.size() >= 5);
    }

}