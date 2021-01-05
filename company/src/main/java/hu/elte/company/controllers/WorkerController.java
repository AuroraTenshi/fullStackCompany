package hu.elte.company.controllers;

import hu.elte.company.Enums.Role;
import hu.elte.company.entities.Project;
import hu.elte.company.entities.Worker;
import hu.elte.company.repositories.ProjectRepository;
import hu.elte.company.repositories.WorkerRepository;
import hu.elte.company.security.AuthenticatedWorker;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/workers")
@RequiredArgsConstructor
public class WorkerController {
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private final WorkerRepository workerRepository;
//    private final AuthenticationManager authenticationManager;
//    private final UserDetailsServiceImpl userDetailService;

    @Autowired
    private AuthenticatedWorker authenticatedWorker;

    @Autowired
    private ProjectRepository projectRepository;

    @PostMapping()
    public ResponseEntity<Worker> register(@RequestBody Worker worker) {
        Optional<Worker> oWorker=workerRepository.findByName(worker.getName());
        if(oWorker.isPresent()){
            return ResponseEntity.badRequest().build();
        }
        worker.setPassword(passwordEncoder.encode(worker.getPassword()));
        worker.setPhone(worker.getPhone());
        worker.setEmail(worker.getEmail());
        worker.setPayment(worker.getPayment());
        worker.setRole(Role.EMPLOYEE);

        return ResponseEntity.ok(workerRepository.save(worker));
    }

    @PostMapping("/authenticate")
    public ResponseEntity authenticate(@RequestBody Worker worker) {
//        Authentication auth = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(worker.getName(), worker.getPassword()));
//        SecurityContext sc = SecurityContextHolder.getContext();
//        sc.setAuthentication(auth);
        return ResponseEntity.ok(authenticatedWorker.getWorker());
    }

    @GetMapping("")
    public ResponseEntity<Iterable<Worker>> getAll(){
        Iterable<Worker> workers=workerRepository.findAll();
        return ResponseEntity.ok(workers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Worker> get(@PathVariable Integer id){
        Optional<Worker> oWorker=workerRepository.findById(id);
        if(!oWorker.isPresent()){
            return ResponseEntity.notFound().build();
        }
        else {
            return ResponseEntity.ok(oWorker.get());
        }
    }

//    @PreAuthorize("hasRole('EMPLOYER')")
    @GetMapping("/{id}/projects")
    public ResponseEntity<Iterable<Project>> getProjects(@PathVariable Integer id){
        Optional<Worker> oWorker=workerRepository.findById(id);
        if(oWorker.isPresent()){
            return ResponseEntity.ok(oWorker.get().getProjects());
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/projects")
    public ResponseEntity<Project> postProject(@PathVariable Integer id, @RequestBody Project project){
        Optional<Worker> oWorker=workerRepository.findById(id);
        if(!oWorker.isPresent()){
            return ResponseEntity.notFound().build();
        }
        else {
            Worker worker=oWorker.get();
            Project newProject=projectRepository.save(project);
            worker.getProjects().add(newProject);
            workerRepository.save(worker);
            return ResponseEntity.ok(newProject);
        }
    }
}
