package hu.elte.company.controllers;

import hu.elte.company.entities.Material;
import hu.elte.company.entities.Site;
import hu.elte.company.repositories.MaterialRepository;
import hu.elte.company.repositories.SiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/sites")
public class SiteController {

    @Autowired
    private SiteRepository siteRepository;

    @Autowired
    private MaterialRepository materialRepository;

    @GetMapping("")
    public ResponseEntity<Iterable<Site>> getAll(){
        Iterable<Site> sites=siteRepository.findAll();
        return ResponseEntity.ok(sites);
    }

    @GetMapping("/{id}")
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
    public ResponseEntity<Site> post(@RequestBody Site site){
        Site savedSite = siteRepository.save(site);
        return ResponseEntity.ok(savedSite);
    }

    @DeleteMapping("/{id}")
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
    public ResponseEntity<Material> addMaterial(@PathVariable Integer id, @RequestBody Material material){
        Optional<Site> oSite=siteRepository.findById(id);
        if(oSite.isPresent()){
            Site site=oSite.get();
            material.setPlace(site);
            return ResponseEntity.ok(materialRepository.save(material));
        }
        return ResponseEntity.notFound().build();
    }

}
