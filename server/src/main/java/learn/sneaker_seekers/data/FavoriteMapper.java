package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Favorite;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class FavoriteMapper implements RowMapper<Favorite> {

    @Override
    public Favorite mapRow(ResultSet rs, int rowNum) throws SQLException {
        Favorite favorite = new Favorite();

        favorite.setFavoriteId(rs.getInt("favorite_id"));
        favorite.setStyleId(rs.getInt("style_id"));
        favorite.setAppUserId(rs.getInt("app_user_id"));

        return favorite;
    }

}
