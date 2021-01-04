package hu.elte.company.controllers;

import hu.elte.company.entities.Material;
import hu.elte.company.entities.Site;
import hu.elte.company.entities.Worker;
import hu.elte.company.repositories.MaterialRepository;
import hu.elte.company.repositories.SiteRepository;
import hu.elte.company.repositories.WorkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @GetMapping("")
    @PreAuthorize("hasAnyRole('EMPLOYEE, EMPLOYER')")
    public ResponseEntity<Iterable<Site>> getAll(){
        Iterable<Site> sites=siteRepository.findAll();
        return ResponseEntity.ok(sites);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('EMPLOYEE, EMPLOYER')")
    public ResponseEntity<Site> get(@PathVariable Integer id){
        Optional<Site> oSite=siteRepository.findById(id);
        if(!oSite.isPresent()){
            return ResponseEntity.notFound().build();
        }
        else {
            return ResponseEntity.ok(oSite.get());
        }
    }

    @PostMapping("")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<Site> post(@RequestBody Site site){
        Site savedSite = siteRepository.save(site);
        return ResponseEntity.ok(savedSite);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<Site> delete(@PathVariable Integer id){
        Optional<Site> oSite=siteRepository.findById(id);
        if(!oSite.isPresent()){
            return ResponseEntity.notFound().build();
        }
        else {
            return ResponseEntity.ok().build();
        }
    }

    @GetMapping("/{id}/materials")
    @PreAuthorize("hasAnyRole('EMPLOYEE', 'EMPLOYER')")
    public ResponseEntity<Iterable<Material>> getMaterials(@PathVariable Integer id){
        Optional<Site> oSite=siteRepository.findById(id);
        if(oSite.isPresent()){
            return ResponseEntity.ok(oSite.get().getMaterials());
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/materials")
    @PreAuthorize("hasAnyRole('EMPLOYEE', 'EMPLOYER')")
    public ResponseEntity<Material> addMaterial(@PathVariable Integer id, @RequestBody Material material){
        Optional<Site> oSite=siteRepository.findById(id);
        if(oSite.isPresent()){
            Site site=oSite.get();
            material.setPlace(site);
            return ResponseEntity.ok(materialRepository.save(material));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/workers")
    public ResponseEntity<Iterable<Worker>> getWorkers(@PathVariable Integer id){
        Optional<Site> oSite=siteRepository.findById(id);
        if(oSite.isPresent()){
            return ResponseEntity.ok(oSite.get().getWorkers());
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }


}
