package learn.sneaker_seekers.data;

import learn.sneaker_seekers.models.Condition;

import java.util.List;

public interface ConditionRepository {

    List<Condition> findAll();

}
