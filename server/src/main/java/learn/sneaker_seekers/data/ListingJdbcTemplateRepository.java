package learn.sneaker_seekers.data;

import org.springframework.jdbc.core.JdbcTemplate;

public class ListingJdbcTemplateRepository implements ListingRepository{

    private final JdbcTemplate jdbcTemplate;

    public ListingJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {this.jdbcTemplate = jdbcTemplate;}

}
