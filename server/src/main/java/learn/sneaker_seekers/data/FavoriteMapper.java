package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.AppUser;
import learn.sneaker_seekers.models.Favorite;
import learn.sneaker_seekers.models.Location;
import learn.sneaker_seekers.models.Style;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class FavoriteMapper implements RowMapper<Favorite> {

    @Override
    public Favorite mapRow(ResultSet rs, int rowNum) throws SQLException {
        Favorite favorite = new Favorite();

        favorite.setFavoriteId(rs.getInt("favorite_id"));

        int appUserId = rs.getInt("app_user_id");
        AppUser user = new AppUser();
        user.setId(appUserId);

        StyleMapper styleMapper = new StyleMapper();
        favorite.setStyle(styleMapper.mapRow(rs, rowNum));

        /*
        AppUserMapper appUserMapper = new AppUserMapper();
        favorite.setAppUser(appUserMapper.mapRow(rs, rowNum));



         */
        return favorite;
    }

}
