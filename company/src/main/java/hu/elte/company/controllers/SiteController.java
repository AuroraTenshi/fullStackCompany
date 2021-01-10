package hu.elte.company.controllers;

import hu.elte.company.Enums.Role;
import hu.elte.company.entities.Material;
import hu.elte.company.entities.Project;
import hu.elte.company.entities.Site;
import hu.elte.company.entities.Worker;
import hu.elte.company.repositories.MaterialRepository;
import hu.elte.company.repositories.SiteRepository;
import hu.elte.company.repositories.WorkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/sites")
public class SiteController {

    @Autowired
    private SiteRepository siteRepository;

    @Autowired
    private MaterialRepository materialRepository;

    @Autowired
    private WorkerRepository workerRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @GetMapping("")
    @PreAuthorize("hasAnyRole('EMPLOYEE, EMPLOYER')")
    public ResponseEntity<Iterable<Site>> getAll() {
        Iterable<Site> sites = siteRepository.findAll();
        return ResponseEntity.ok(sites);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('EMPLOYEE, EMPLOYER')")
    public ResponseEntity<Site> get(@PathVariable Integer id) {
        Optional<Site> oSite = siteRepository.findById(id);
        if (!oSite.isPresent()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(oSite.get());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Site> put(@PathVariable Integer id, @RequestBody Site site) {
        Optional<Site> oSite=siteRepository.findById(id);
        if(!oSite.isPresent()){
            return ResponseEntity.notFound().build();
        }else {
            Site newSite= oSite.get();
            newSite.setName(site.getName());
            newSite.setAddress(site.getAddress());
            newSite.setType(site.getType());

            return ResponseEntity.ok(siteRepository.save(newSite));
        }
    }

    @PostMapping("")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<Site> post(@RequestBody Site site) {
        Site savedSite = siteRepository.save(site);
        return ResponseEntity.ok(savedSite);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<Site> delete(@PathVariable Integer id) {
        Optional<Site> oSite = siteRepository.findById(id);
        if (!oSite.isPresent()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().build();
        }
    }

    @GetMapping("/{id}/materials")
    @PreAuthorize("hasAnyRole('EMPLOYEE', 'EMPLOYER')")
    public ResponseEntity<Iterable<Material>> getMaterials(@PathVariable Integer id) {
        Optional<Site> oSite = siteRepository.findById(id);
        if (oSite.isPresent()) {
            return ResponseEntity.ok(oSite.get().getMaterials());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/materials")
    @PreAuthorize("hasAnyRole('EMPLOYEE', 'EMPLOYER')")
    public ResponseEntity<Material> addMaterial(@PathVariable Integer id, @RequestBody Material material) {
        Optional<Site> oSite = siteRepository.findById(id);
        if (oSite.isPresent()) {
            Site site = oSite.get();
            material.setPlace(site);
            return ResponseEntity.ok(materialRepository.save(material));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/workers")
    public ResponseEntity<Iterable<Worker>> getWorkers(@PathVariable Integer id) {
        Optional<Site> oSite = siteRepository.findById(id);
        if (oSite.isPresent()) {
            return ResponseEntity.ok(oSite.get().getWorkers());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/workers")
    public ResponseEntity<Worker> postWorkers(@PathVariable Integer id, @RequestBody Worker worker) {
        Optional<Site> oSite = siteRepository.findById(id);
        if (!oSite.isPresent()) {
            return ResponseEntity.notFound().build();
        } else {
            Site site = oSite.get();
            if(worker.getRole() == null){
                worker.setRole(Role.EMPLOYEE);
            }
            worker.setPassword(passwordEncoder.encode(worker.getPassword()));
            worker.setSite(site);
            return ResponseEntity.ok(workerRepository.save(worker));
        }
    }
}
