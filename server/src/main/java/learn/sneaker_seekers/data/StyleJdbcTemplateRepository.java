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

        final String sql = "select style_id, style_name, `description`, release_year, style_image, brand_id "
                + "from style "
                + "where style_id = " + styleId + ";";

        return jdbcTemplate.queryForObject(sql, new StyleMapper());

    }

    @Override
    public Style add(Style style) {
        final String sql = "insert into style (style_name, `description`, release_year, style_image, brand_id) "
                + "values (?, ?, ?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, style.getStyleName());
            ps.setString(2, style.getDescription());
            ps.setInt(3, style.getReleaseYear());
            ps.setString(4, style.getStyleImage());
            ps.setInt(5, style.getBrandId().getBrandId());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        style.setStyleId(keyHolder.getKey().intValue());
        return style;
    }

}
