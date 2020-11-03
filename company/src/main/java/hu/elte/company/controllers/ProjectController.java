package hu.elte.company.controllers;

import hu.elte.company.entities.Project;
import hu.elte.company.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/projects")
public class ProjectController {
    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping("")
    public ResponseEntity<Iterable<Project>> getAll() {
        Iterable<Project> projects = projectRepository.findAll();
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> get(@PathVariable Integer id) {
        Optional<Project> oProject = projectRepository.findById(id);
        if (!oProject.isPresent()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(oProject.get());
        }
    }

    @PostMapping("")
    public ResponseEntity<Project> post(@RequestBody Project project) {
        Project savedProject = projectRepository.save(project);
        return ResponseEntity.ok(savedProject);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> modify(@RequestBody Project project, @PathVariable Integer id) {
        Optional<Project> oProject = projectRepository.findById(id);
        if (!oProject.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Project newProject=oProject.get();
        newProject.setName(project.getName());
        newProject.setPretender(project.getPretender());
        newProject.setDeadline(project.getDeadline());

        projectRepository.save(newProject);

        return ResponseEntity.ok(newProject);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Project> delete(@PathVariable Integer id) {
        try {
            projectRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
