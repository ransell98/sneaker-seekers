package learn.sneaker_seekers.domain;

import learn.sneaker_seekers.data.DataAccessException;
import learn.sneaker_seekers.data.FollowRepository;
import learn.sneaker_seekers.models.Follow;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FollowService {
    private final FollowRepository repository;

    public FollowService(FollowRepository repository) { this.repository = repository; }

    public List<Follow> findByFollowerId(int followerId) {
        return repository.findByFollowerId(followerId);
    }



    public Result add(Follow follow) throws DataAccessException {
        Result result = validate(follow);
        if (!result.isSuccess()){
            return result;
        }

        follow = repository.add(follow);
        result.setPayload(follow);
        return result;
    }

    public boolean deleteByFollowerIdAndVendorId(int followerId, int vendorId) throws DataAccessException {
        if (followerId < 0 || vendorId < 0){
            return false;
        }
        return repository.deleteByFollowerIdAndVendorId(followerId, vendorId);
    }

    private Result<Follow> validate(Follow follow) {
        Result<Follow> result = new Result();

        if (follow == null) {
            result.addMessage("Follow cannot be null.", ResultType.INVALID);
            return result;
        }

        if (follow.getFollower().getId() == 0) {
            result.addMessage("Follower ID cannot be null", ResultType.INVALID);
        }

        if (follow.getVendor().getId() == 0) {
            result.addMessage("Vendor ID cannot be null", ResultType.INVALID);
        }

        return result;
    }
}
