package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Condition;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ConditionJdbcTemplateRepository implements ConditionRepository{

    private final JdbcTemplate jdbcTemplate;

    public ConditionJdbcTemplateRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }

    @Override
    public List<Condition> findAll() {

        final String sql = "select condition_id, condition_name "
                + "from `condition`;";

        return jdbcTemplate.query(sql, new ConditionMapper());

    }

}
