package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Brand;
import learn.sneaker_seekers.models.Style;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;

public class StyleMapper implements RowMapper<Style> {

    @Override
    public Style mapRow(ResultSet rs, int rowNum) throws SQLException {
        Style style = new Style();

        style.setStyleId(rs.getInt("style_id"));
        style.setExternalStyleId(rs.getString("external_style_id"));
        style.setStyleName(rs.getString("style_name"));
        style.setDescription(rs.getString("description"));
        style.setReleaseYear(rs.getDate("release_year").toLocalDate());
        style.setColorway(rs.getString("colorway"));

        BrandMapper brandMapper = new BrandMapper();
        style.setBrand(brandMapper.mapRow(rs, rowNum));

        style.setStyleImage(rs.getString("style_image"));

        return style;

    }

}
