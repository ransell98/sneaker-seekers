package learn.sneaker_seekers.domain;


import learn.sneaker_seekers.data.StyleRepository;
import learn.sneaker_seekers.models.Style;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import javax.swing.text.StyledDocument;

import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class StyleServiceTest {

    @MockBean
    StyleRepository repository;

    @Autowired
    StyleService service;

    @Test
    void shouldFindById() {
        Style expected = service.findByStyleId(2);
        when(repository.findByStyleId(2)).thenReturn(expected);

        Style actual = service.findByStyleId(2);
        assertEquals(expected, actual);
    }

    @Test
    void shouldAdd() {
        Style style = makeStyle();
        Style mockStyle = makeStyle();

        when(repository.add(style)).thenReturn(mockStyle);

        Result<Style> actual = service.add(style);
        assertEquals(ResultType.SUCCESS, actual.getStatus());
        assertEquals(mockStyle, actual.getPayload());
    }

    @Test
    void shouldNotAddNull() {
        Result<Style> result = service.add(null);
        assertEquals(ResultType.INVALID, result.getStatus());
        assertNull(result.getPayload());
    }

    @Test
    void shouldNotAddEmpty() {
        Style style = new Style();
        style.setStyleName("");
        style.setDescription("");
        style.setReleaseYear(0);
        style.setStyleImage(null);
        style.setBrandId(0);

        Result<Style> result = service.add(style);
        assertEquals(ResultType.INVALID, result.getStatus());
        assertNull(result.getPayload());
    }

    Style makeStyle() {
        Style style = new Style();

        style.setStyleName("Yellow Strike");
        style.setDescription("Yellow and white low-top Nike dunks");
        style.setReleaseYear(2020);
        style.setStyleImage(null);
        style.setBrandId(1);

        return style;
    }
}