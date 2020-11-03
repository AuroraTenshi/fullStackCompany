package hu.elte.company.repositories;

import hu.elte.company.entities.Worker;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface WorkerRepository extends CrudRepository<Worker, Integer> {
    Optional<Worker> findByName(String name);
    Optional<Worker> findByEmail(String email);
    Optional<Worker> findByPhone(String phone);
}
