package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.UpgradeRequest;

import java.util.List;

public interface UpgradeRequestRepository {

    List<UpgradeRequest> findAll();

    UpgradeRequest add(UpgradeRequest upgradeRequest) throws DataAccessException;

    boolean deleteByUpgradeRequestId(int upgradeRequestId) throws DataAccessException;

}
