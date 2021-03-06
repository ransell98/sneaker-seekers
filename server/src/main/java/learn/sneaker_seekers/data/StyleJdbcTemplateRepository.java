package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Brand;
import learn.sneaker_seekers.models.Style;
import learn.sneaker_seekers.models.Table;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import javax.xml.crypto.Data;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.time.LocalDate;

@Repository
public class StyleJdbcTemplateRepository implements StyleRepository{

    private final JdbcTemplate jdbcTemplate;

    public StyleJdbcTemplateRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }

    @Override
    public Style findByStyleId(int styleId) throws DataAccessException {

        final String sql = "select s.style_id, s.external_style_id, s.style_name, s.`description`, "
                + "s.release_year, s.colorway, s.style_image, b.brand_id, b.brand_name "
                + "from style s "
                + "inner join brand b on s.brand_id = b.brand_id "
                + "where s.style_id = " + styleId + ";";

        return jdbcTemplate.queryForObject(sql, new StyleMapper());

    }

    @Override
    public Style findByExternalStyleId(String externalStyleId) {
        final String sql = "select s.style_id, s.external_style_id, s.style_name, s.`description`, "
                + "s.release_year, s.colorway, s.style_image, b.brand_id, b.brand_name "
                + "from style s "
                + "inner join brand b on s.brand_id = b.brand_id "
                + "where s.external_style_id = \"" + externalStyleId + "\";";

        try {
            Style style = jdbcTemplate.queryForObject(sql, new StyleMapper());
            return style;
        } catch (EmptyResultDataAccessException e){
            return null;
        }
    }

    @Override
    public Style add(Style style) {
        if (findByExternalStyleId(style.getExternalStyleId()) != null){
            return findByExternalStyleId(style.getExternalStyleId());
        }

        final String sql = "insert into style (style_id, external_style_id, style_name, `description`, release_year, colorway, style_image, brand_id) "
                + "values (?, ?, ?, ?, ?, ?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, style.getStyleId());
            ps.setString(2, style.getExternalStyleId());
            ps.setString(3, style.getStyleName());
            ps.setString(4, style.getDescription());
            ps.setString(5, style.getReleaseYear().toString());
            ps.setString(6, style.getColorway());
            ps.setString(7, style.getStyleImage());
            ps.setInt(8, style.getBrand().getBrandId());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }


        style.setStyleId(keyHolder.getKey().intValue());

        return style;
    }


}
