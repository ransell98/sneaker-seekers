package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Follow;

import java.util.List;

public interface FollowRepository {

    List<Follow> findByFollowerId(int followerId);

    Follow add(Follow follow) throws DataAccessException;

    boolean deleteByFollowerIdAndVendorId(int followerId, int vendorId) throws DataAccessException;

}
