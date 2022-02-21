package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Style;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;

@Repository
public class StyleJdbcTemplateRepository implements StyleRepository{

    private final JdbcTemplate jdbcTemplate;

    public StyleJdbcTemplateRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }

    @Override
    public Style findByStyleId(int styleId) {

        final String sql = "select style_id, style_name, `description`, release_year, brand_id, style_image "
                + "from style;";

        return jdbcTemplate.queryForObject(sql, new StyleMapper());

    }

    @Override
    public Style add(Style style) {
        final String sql = "insert into style (style_name, `description`, release_year, brand_id) "
                + "values (?, ?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        return null;
    }

}
