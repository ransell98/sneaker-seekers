package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Brand;
import learn.sneaker_seekers.models.Style;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class StyleJdbcTemplateRepositoryTest {

    final static int NEXT_ID = 3;

    @Autowired
    StyleJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindByStyleId() throws DataAccessException {
        Style style = repository.findByStyleId(1);
        assertEquals(1, style.getStyleId());
        assertEquals("Panda Dunks", style.getStyleName());
    }

    @Test
    void shouldAdd() {
        Style style = new Style();

        style.setStyleId(3);
        style.setExternalStyleId(null);
        style.setStyleName("Yellow Strike");
        style.setDescription("Yellow and white low-top Nike dunks");
        style.setReleaseYear(LocalDate.of(2020, 01, 01));
        style.setColorway("yellow/white");
        style.setStyleImage(null);

        Brand brand = new Brand();
        brand.setBrandId(1);
        style.setBrand(brand);

        Style actual = repository.add(style);
        assertNotNull(actual);
        assertEquals(NEXT_ID, actual.getStyleId());
    }

}