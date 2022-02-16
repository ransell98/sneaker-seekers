package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Condition;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ConditionMapper implements RowMapper<Condition> {

    @Override
    public Condition mapRow(ResultSet rs, int rowNum) throws SQLException {
        Condition condition = new Condition();

        condition.setConditionId(rs.getInt("condition_id"));
        condition.setConditionName(rs.getString("condition_name"));

        return condition;
    }

}
