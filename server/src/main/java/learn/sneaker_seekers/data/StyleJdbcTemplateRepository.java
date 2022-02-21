package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Style;
import org.springframework.jdbc.core.JdbcTemplate;

public class StyleJdbcTemplateRepository implements StyleRepository{

    private final JdbcTemplate jdbcTemplate;

    public StyleJdbcTemplateRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }

    @Override
    public Style findByStyleId(int styleId) {

        final String sql = "select style_id, style_name, `description`, release_year, brand_id, style_image "
                + "from style;";

        return jdbcTemplate.queryForObject(sql, new StyleMapper());

    }

}
