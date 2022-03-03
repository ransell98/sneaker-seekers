package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.UpgradeRequest;

import java.util.List;

public interface UpgradeRequestRepository {

    List<UpgradeRequest> findAll();

    List<UpgradeRequest> findByAppUserId(int appUserId);

    UpgradeRequest findByUpgradeRequestId(int upgradeRequestId) throws DataAccessException;

    UpgradeRequest add(UpgradeRequest upgradeRequest) throws DataAccessException;

    boolean deleteByUpgradeRequestId(int upgradeRequestId) throws DataAccessException;

}
