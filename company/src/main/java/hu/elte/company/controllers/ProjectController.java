package hu.elte.company.controllers;

import ch.qos.logback.core.pattern.util.RegularEscapeUtil;
import hu.elte.company.entities.Project;
import hu.elte.company.entities.Worker;
import hu.elte.company.repositories.ProjectRepository;
import hu.elte.company.repositories.WorkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.Optional;

@RestController
@RequestMapping("/projects")
public class ProjectController {
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private WorkerRepository workerRepository;

    @GetMapping("")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<Iterable<Project>> getAll() {
        Iterable<Project> projects = projectRepository.findAll();
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('EMPLOYER', 'EMPLOYEE')")
    public ResponseEntity<Project> get(@PathVariable Integer id) {
        Optional<Project> oProject = projectRepository.findById(id);
        if (!oProject.isPresent()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(oProject.get());
        }
    }

    @PostMapping("")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<Project> post(@RequestBody Project project) {
        Project savedProject = projectRepository.save(project);
        return ResponseEntity.ok(savedProject);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<Project> modify(@RequestBody Project project, @PathVariable Integer id) {
        Optional<Project> oProject = projectRepository.findById(id);
        if (!oProject.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Project newProject = oProject.get();
        newProject.setName(project.getName());
        newProject.setPretender(project.getPretender());
        newProject.setDeadline(project.getDeadline());

        projectRepository.save(newProject);

        return ResponseEntity.ok(newProject);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<Project> delete(@PathVariable Integer id) {
        try {
            projectRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/workers")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<Iterable<Worker>> getWorkers(@PathVariable Integer id) {
        Optional<Project> oProject = projectRepository.findById(id);
        if (oProject.isPresent()) {
            return ResponseEntity.ok(oProject.get().getWorkers());
        }
        return ResponseEntity.notFound().build();
    }

}
