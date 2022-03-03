package learn.sneaker_seekers.domain;

import learn.sneaker_seekers.data.DataAccessException;
import learn.sneaker_seekers.data.EventRepository;
import learn.sneaker_seekers.data.UpgradeRequestRepository;
import learn.sneaker_seekers.models.AppUser;
import learn.sneaker_seekers.models.Event;
import learn.sneaker_seekers.models.UpgradeRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class UpgradeRequestService {
    private final UpgradeRequestRepository repository;

    public UpgradeRequestService(UpgradeRequestRepository repository) { this.repository = repository; }

    public List<UpgradeRequest> findAll() { return repository.findAll(); }

    public List<UpgradeRequest> findByAppUserId(int appUserId) {
        return repository.findByAppUserId(appUserId);
    }

    public Result add(UpgradeRequest upgradeRequest) throws DataAccessException {
        Result result = validate(upgradeRequest);
        if (!result.isSuccess()) {
            return result;
        }

        if (upgradeRequest.getUpgradeRequestId() != 0) {
            result.addErrorMessage("Upgrade Request ID must not be set for add.");
            return result;
        }

        upgradeRequest = repository.add(upgradeRequest);
        result.setPayload(upgradeRequest);
        return result;
    }

    public boolean deleteByUpgradeRequestId(int upgradeRequestId) throws DataAccessException {
        if (upgradeRequestId < 0){
            return false;
        }

        return repository.deleteByUpgradeRequestId(upgradeRequestId);
    }

    private Result<UpgradeRequest> validate(UpgradeRequest upgradeRequest) {
        Result<UpgradeRequest> result = new Result();

        if (upgradeRequest == null) {
            result.addMessage("Upgrade Request cannot be null.", ResultType.INVALID);
            return result;
        }

        return result;
    }
}
