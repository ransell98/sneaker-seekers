package learn.sneaker_seekers.domain;

import learn.sneaker_seekers.data.DataAccessException;
import learn.sneaker_seekers.data.EventRepository;
import learn.sneaker_seekers.data.TableRepository;
import learn.sneaker_seekers.models.Event;
import learn.sneaker_seekers.models.Table;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TableService {
    private final TableRepository repository;

    public TableService(TableRepository repository) { this.repository = repository; }

    public List<Table> findByEventId(int eventId) { return repository.findByEventId(eventId); }

    public Result add(Table table) throws DataAccessException {
        Result result = validate(table);
        if (!result.isSuccess()) {
            return result;
        }

        if (table.getEventId() != 0) {
            result.addErrorMessage("Table ID must not be set for add.");
            return result;
        }

        table = repository.add(table);
        result.setPayload(table);
        return result;
    }

    public Result update(Table table) throws DataAccessException {
        Result result = validate(table);
        if (!result.isSuccess()) {
            return result;
        }

        boolean success = repository.update(table);
        if (!success) {
            result.addErrorMessage("Could not update Table ID: " + table.getTableId());
        }

        return result;
    }

    private Result<Table> validate(Table table) throws DataAccessException {
        Result<Table> result = new Result();

        if (table == null) {
            result.addErrorMessage("Table cannot be null.");
        }

        if (table.getTableNumber() > repository.getMaxTables(table.getEventId())) {
            result.addErrorMessage("Table number cannot be greater than event's max tables.");
        }

        return result;
    }
}
