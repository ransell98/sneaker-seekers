package learn.sneaker_seekers.data;


import learn.sneaker_seekers.models.AppUser;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class AppUserRepository {

    private final JdbcTemplate jdbcTemplate;

    public AppUserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<AppUser> mapper = (rs, i) -> {
        AppUser appUser = new AppUser();
        appUser.setId(rs.getInt("app_user_id"));
        appUser.setUsername(rs.getString("username"));
        appUser.setPassword(rs.getString("password_hash"));
        return appUser;
    };

    public List<AppUser> findAll() {
        return jdbcTemplate.query("select app_user_id, username, password_hash "
                + "from app_user;", mapper);
    }

    @Transactional
    public AppUser findByUsername(String username) {
        AppUser user = jdbcTemplate.query(
                        "select app_user_id, username, password_hash from app_user where username = ?;",
                        mapper,
                        username).stream()
                .findFirst()
                .orElse(null);

        if (user != null) {
            var authorities = getAuthorities(user.getId());
            user.setAuthorityNames(authorities);
        }
        return user;
    }

    private List<String> getAuthorities(int appUserId) {

        String sql = "select r.app_role_id, r.name "
                + "from app_user_role aur "
                + "inner join app_role r on aur.app_role_id = r.app_role_id "
                + "where aur.app_user_id = ?";

        return jdbcTemplate.query(sql,
                (rs, i) -> rs.getString("name"),
                appUserId);
    }
}
