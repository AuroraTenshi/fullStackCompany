package hu.elte.company.controllers;

import hu.elte.company.entities.Worker;
import hu.elte.company.repositories.ProjectRepository;
import hu.elte.company.repositories.WorkerRepository;
import hu.elte.company.security.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/workers")
@RequiredArgsConstructor
public class WorkerController {
    private final WorkerRepository workerRepository;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImpl userDetailService;

    @Autowired
    private ProjectRepository projectRepository;

    @PostMapping()
    public void register(@RequestBody Worker worker) {
        workerRepository.save(worker);
    }

    @PostMapping("/authenticate")
    public void authenticate(@RequestBody Worker worker) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(worker.getName(), worker.getPassword()));
        SecurityContext sc = SecurityContextHolder.getContext();
        sc.setAuthentication(auth);
    }

//    @PreAuthorize("hasRole('EMPLOYER')")
//    @GetMapping("/{id}/projects")
//    public ResponseEntity<Iterable<Project>> getProjects(@PathVariable Integer id){
//        Optional<Worker> oWorker=workerRepository.findById(id);
//        if(oWorker.isPresent()){
//            return ResponseEntity.ok(oWorker.get().getProjects());
//        }
//        else {
//            return ResponseEntity.notFound().build();
//        }
//    }

}
