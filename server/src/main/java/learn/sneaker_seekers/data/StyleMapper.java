package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Style;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class StyleMapper implements RowMapper<Style> {

    @Override
    public Style mapRow(ResultSet rs, int rowNum) throws SQLException {
        Style style = new Style();

        style.setStyleId(rs.getInt("style_id"));
        style.setStyleName(rs.getString("style_name"));
        style.setDescription(rs.getString("description"));
        style.setReleaseYear(rs.getInt("release_year"));
        style.setBrandId(rs.getInt("brand_id"));
        style.setStyleImage(rs.getString("style_image"));

        return style;

    }

}
