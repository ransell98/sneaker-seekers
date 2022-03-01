package learn.sneaker_seekers.domain;

import learn.sneaker_seekers.data.DataAccessException;
import learn.sneaker_seekers.data.ListingRepository;
import learn.sneaker_seekers.models.Condition;
import learn.sneaker_seekers.models.Listing;
import learn.sneaker_seekers.models.Style;
import learn.sneaker_seekers.models.Table;
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

    @Test
    void shouldAdd() throws DataAccessException {
        Listing listing = makeListing();
        Listing mockListing = makeListing();
        when(repository.add(listing)).thenReturn(mockListing);

        Result<Listing> actual = service.add(listing);
        assertEquals(ResultType.SUCCESS, actual.getStatus());
        assertEquals(mockListing, actual.getPayload());
    }

    @Test
    void shouldNotAddNull() throws DataAccessException {
        Result<Listing> result = service.add(null);
        assertEquals(ResultType.INVALID, result.getStatus());
        assertNull(result.getPayload());
    }

    @Test
    void shouldDelete() throws DataAccessException {
        when(repository.deleteByListingId(2)).thenReturn(true);
        assertTrue(service.deleteByListingId(2));
    }

    @Test
    void shouldNotDeleteNonExisting() throws DataAccessException {
        when(repository.deleteByListingId(32)).thenReturn(false);
        assertFalse(service.deleteByListingId(32));
    }

    Listing makeListing() {
        Listing listing = new Listing();
        listing.setListingPrice(BigDecimal.valueOf(500));
        listing.setQuantity(15);

        Style style = new Style();
        style.setStyleId(2);
        listing.setStyle(style);

        Table table = new Table();
        table.setTableId(1);
        listing.setTable(table);

        Condition condition = new Condition();
        condition.setConditionId(3);
        listing.setListingCondition(condition);

        return listing;
    }

}