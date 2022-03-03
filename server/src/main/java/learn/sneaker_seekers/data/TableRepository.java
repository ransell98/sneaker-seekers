package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Table;

import java.util.List;

public interface TableRepository {

    List<Table> findByEventId(int eventId);

    Table add(Table table) throws DataAccessException;

    boolean update(Table table) throws DataAccessException;

    int getMaxTables(int eventId) throws DataAccessException;

    boolean isTableBooked(int eventId, int tableNumber) throws DataAccessException;

    boolean doesUserAlreadyHaveTable(int eventId, int appUserId) throws DataAccessException;

}
