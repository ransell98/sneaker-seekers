package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Favorite;
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
    public List<Favorite> findByAppUserId(int appUserId) {

        final String sql = "select favorite_id, style_id, app_user_id "
                + "from favorite "
                + "where app_user_id = " + appUserId + ";";

        return jdbcTemplate.query(sql, new FavoriteMapper());

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
            statement.setInt(2, favorite.getStyleId());
            statement.setInt(3, favorite.getAppUserId());
            return statement;
        }, keyHolder);

        if (rowsAffected <= 0) {
            throw new DataAccessException("Favorite insert failed.", null);
        }

        favorite.setFavoriteId(keyHolder.getKey().intValue());

        return favorite;


    }

    @Override
    public boolean deleteByFavoriteId(int favoriteId) throws DataAccessException {

        int rowsAffected = jdbcTemplate.update("delete from favorite where favorite_id = ?;", favoriteId);
        return rowsAffected > 0;

    }
}
