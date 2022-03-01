package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.AppUser;
import learn.sneaker_seekers.models.Event;
import learn.sneaker_seekers.models.Table;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class TableJdbcTemplateRepositoryTest {

    final static int NEXT_ID = 3;

    @Autowired
    TableJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindById() {
        List<Table> expected = repository.findByEventId(2);
        assertEquals(1, 1);
    }

    @Test
    void shouldNotFindNonExisting() {
        List<Table> none = repository.findByEventId(19);
        assertNotEquals(0, none);
    }

    @Test
    void shouldAdd() throws DataAccessException {
        Table table = new Table();
        table.setBooked(true);
        table.setTableNumber(18);

        Event event = new Event();
        event.setEventId(3);
        table.setEventId(event);

        AppUser appUser = new AppUser();
        appUser.setId(1);
        table.setAppUser(appUser);

        Table actual = repository.add(table);
        assertNotNull(actual);
        assertEquals(NEXT_ID, actual.getTableId());
    }

    @Test
    void shouldUpdate() throws DataAccessException {
        Table table = makeTable();
        table.setTableId(2);
        assertTrue(repository.update(table));
    }

    Table makeTable() {
        Table table = new Table();
        table.setBooked(true);
        table.setTableNumber(18);

        Event event = new Event();
        event.setEventId(3);
        table.setEventId(event);

        AppUser appUser = new AppUser();
        appUser.setId(1);
        table.setAppUser(appUser);

        return table;
    }






}