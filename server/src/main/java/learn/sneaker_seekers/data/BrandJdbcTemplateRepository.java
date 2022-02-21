package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Brand;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class BrandJdbcTemplateRepository implements BrandRepository{

    private final JdbcTemplate jdbcTemplate;

    public BrandJdbcTemplateRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }

    @Override
    public List<Brand> findAll() {

        final String sql = "select brand_id, brand_name "
                + "from brand;";

        return jdbcTemplate.query(sql, new BrandMapper());

    }

    @Override
    public Brand add(Brand brand) throws DataAccessException {

        final String sql = "insert into brand"
                + "(brand_id, brand_name) "
                + "values (?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(conn -> {
            PreparedStatement statement = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setInt(1, brand.getBrandId());
            statement.setString(2, brand.getBrandName());
            return statement;
        }, keyHolder);

        if (rowsAffected <= 0) {
            throw new learn.sneaker_seekers.data.DataAccessException("Brand insert failed.", null);
        }

        brand.setBrandId(keyHolder.getKey().intValue());

        return brand;

    }
}
