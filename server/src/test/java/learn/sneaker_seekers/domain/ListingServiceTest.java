package learn.sneaker_seekers.domain;

import learn.sneaker_seekers.data.FollowRepository;
import learn.sneaker_seekers.data.ListingRepository;
import learn.sneaker_seekers.models.Condition;
import learn.sneaker_seekers.models.Follow;
import learn.sneaker_seekers.models.Listing;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class ListingServiceTest {

    @MockBean
    ListingRepository repository;

    @Autowired
    ListingService service;

    @Test
    void shouldFindByTableId() {
        List<Listing> expected = service.findByTableId(1);
        when(repository.findByTableId(1)).thenReturn(expected);
        List<Listing> actual = service.findByTableId(1);
        assertEquals(expected, actual);
    }

    @Test
    void shouldNotFakeFindByTableId() {
        List<Listing> expected = service.findByTableId(13);
        when(repository.findByTableId(13)).thenReturn(expected);
        List<Listing> actual = service.findByTableId(13);
        assertEquals(expected, actual);
    }



}