package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Favorite;
import learn.sneaker_seekers.models.Style;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class FavoriteJdbcTemplateRepository implements FavoriteRepository {

    private final JdbcTemplate jdbcTemplate;

    public FavoriteJdbcTemplateRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }


    @Override
    public List<Favorite> findAll() {

        final String sql = "select f.favorite_id, s.style_id, s.external_style_id, s.style_name, s.`description`, "
                + "s.release_year, s.colorway, s.style_image, b.brand_id, b.brand_name "
                + "from favorite f "
                + "inner join style s on f.style_id = s.style_id "
                + "inner join brand b on s.brand_id = b.brand_id;";

        return jdbcTemplate.query(sql, new FavoriteMapper());

    }

    @Override
    public List<Favorite> findByAppUserId(int appUserId) {

        final String sql = "select f.favorite_id, s.style_id, s.external_style_id, s.style_name, s.`description`, "
                + "s.release_year, s.colorway, s.style_image, b.brand_id, b.brand_name, a.app_user_id "
                + "from favorite f "
                + "inner join app_user a on f.app_user_id = a.app_user_id "
                + "inner join style s on f.style_id = s.style_id "
                + "inner join brand b on s.brand_id = b.brand_id "
                + "where f.app_user_id = " + appUserId + ";";

        return jdbcTemplate.query(sql, new FavoriteMapper());

    }

    @Override
    public Favorite findByAppUserIdAndStyleId(int appUserId, int styleId) throws DataAccessException {
        final String sql = "select f.favorite_id, s.style_id, s.external_style_id, s.style_name, s.`description`, "
                + "s.release_year, s.colorway, s.style_image, b.brand_id, b.brand_name, a.app_user_id "
                + "from favorite f "
                + "inner join app_user a on f.app_user_id = a.app_user_id "
                + "inner join style s on f.style_id = s.style_id "
                + "inner join brand b on s.brand_id = b.brand_id "
                + "where f.app_user_id = " + appUserId + " and f.style_id = " + styleId + ";";

        return jdbcTemplate.queryForObject(sql, new FavoriteMapper());
    }

    @Override
    public Favorite add(Favorite favorite) throws DataAccessException {

        final String sql = "insert into favorite"
                + "(favorite_id, style_id, app_user_id) "
                + "values (?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(conn -> {
            PreparedStatement statement = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setInt(1, favorite.getFavoriteId());
            statement.setInt(2, favorite.getStyle().getStyleId());
            statement.setInt(3, favorite.getAppUser().getId());
            return statement;
        }, keyHolder);

        if (rowsAffected <= 0) {
            throw new DataAccessException("Favorite insert failed.", null);
        }

        favorite.setFavoriteId(keyHolder.getKey().intValue());

        return favorite;


    }

    @Override
    public boolean delete(Favorite favorite) throws DataAccessException {

        int rowsAffected = jdbcTemplate.update("delete from favorite where favorite_id = ?;", favorite.getFavoriteId());
        return rowsAffected > 0;

    }

    @Override
    public boolean isStyleAdded(String externalStyleId) throws DataAccessException {

        final String sql = "select style_id "
                + "from style "
                + "where external_style_id = " + externalStyleId + ";";

        Style style = jdbcTemplate.queryForObject(sql, new StyleMapper());

        if (style.getStyleId() > 0){
            return true;
        } else {
            return false;
        }
    }


}
