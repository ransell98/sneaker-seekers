package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Listing;

import java.util.List;

public interface ListingRepository {

    List<Listing> findByTableId(int tableId);

    Listing add(Listing listing) throws DataAccessException;

    boolean deleteByListingId(int listingId) throws DataAccessException;

}
