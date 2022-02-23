package learn.sneaker_seekers.domain;


import learn.sneaker_seekers.data.StyleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class StyleServiceTest {

    @MockBean
    StyleRepository repository;

    @Autowired
    StyleService service;

}