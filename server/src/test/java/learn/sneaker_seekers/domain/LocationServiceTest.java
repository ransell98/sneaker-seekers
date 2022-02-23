package learn.sneaker_seekers.domain;


import learn.sneaker_seekers.data.DataAccessException;
import learn.sneaker_seekers.data.LocationRepository;
import learn.sneaker_seekers.models.Location;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class LocationServiceTest {

    @MockBean
    LocationRepository repository;

    @Autowired
    LocationService service;


    @Test
    void shouldFindAll() {
        List<Location> expected = service.findAll();
        when(repository.findAll()).thenReturn(expected);
        List<Location> actual = service.findAll();
        assertEquals(expected, actual);
    }

    @Test
    void shouldFindByLocationId() {
        Location expected = service.findByLocationId(1);
        when(repository.findByLocationId(1)).thenReturn(expected);
        Location actual = service.findByLocationId(1);
        assertEquals(expected, actual);
    }

    @Test
    void shouldAdd() throws DataAccessException {
        Location location = makeLocation();
        Location mockLocation = makeLocation();
        when(repository.add(location)).thenReturn(mockLocation);
        Result<Location> actual = service.add(location);
        assertEquals(ResultType.SUCCESS, actual.getStatus());
        assertEquals(mockLocation, actual.getPayload());
    }

    Location makeLocation() {
        Location location = new Location();
        location.setLocationName("Atlanta Convention Center");
        location.setLocationAddress("123 Something St NW");
        location.setLocationCity("Atlanta, GA");

        return location;
    }
}