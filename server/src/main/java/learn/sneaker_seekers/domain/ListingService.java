package learn.sneaker_seekers.domain;

import learn.sneaker_seekers.data.DataAccessException;
import learn.sneaker_seekers.data.ListingRepository;
import learn.sneaker_seekers.models.Event;
import learn.sneaker_seekers.models.Listing;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ListingService {
    private final ListingRepository repository;

    public ListingService(ListingRepository repository) { this.repository = repository; }

    public List<Listing> findByTableId(int tableId) {
        return repository.findByTableId(tableId);
    }

    public Result add(Listing listing) throws DataAccessException {
        Result result = validate(listing);
        if (!result.isSuccess()) {
            return result;
        }

        listing = repository.add(listing);
        result.setPayload(listing);
        return result;
    }

    public boolean deleteByListingId(int listingId) throws DataAccessException {
        if (listingId < 0){
            return false;
        }

        return repository.deleteByListingId(listingId);
    }

    private Result validate(Listing listing) {
        Result result = new Result();

        if (listing == null) {
            result.addErrorMessage("Listing cannot be null.");
        }

        return result;
    }
}
