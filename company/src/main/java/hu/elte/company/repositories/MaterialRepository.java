package hu.elte.company.repositories;

import hu.elte.company.entities.Material;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaterialRepository extends CrudRepository<Material, Integer> {
    Iterable<Material> findAllByName(String name);
}
