package hu.elte.company.controllers;

import hu.elte.company.entities.Material;
import hu.elte.company.entities.Site;
import hu.elte.company.repositories.MaterialRepository;
import hu.elte.company.repositories.SiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/materials")
public class MaterialController {

    @Autowired
    private MaterialRepository materialRepository;

    @Autowired
    private SiteRepository siteRepository;

    @GetMapping("")
//    @PreAuthorize("hasAnyRole('EMPLOYEE', 'EMPLOYER', 'GUEST')")
    public ResponseEntity<Iterable<Material>> getAll(@RequestParam(required = false) String name) {
        Iterable<Material> materials;
        if (name != null) {
            materials = materialRepository.findAllByName(name);
        } else {
            materials = materialRepository.findAll();
        }

        return ResponseEntity.ok(materials);
    }

    @GetMapping("/{id}")
//    @PreAuthorize("hasAnyRole('EMPLOYEE', 'EMPLOYER', 'GUEST')")
    public ResponseEntity<Material> get(@PathVariable Integer id) {
        Optional<Material> oMaterial = materialRepository.findById(id);
        if (!oMaterial.isPresent()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(oMaterial.get());
        }
    }

    @PostMapping("")
//    @PreAuthorize("hasAnyRole('EMPLOYEE', 'EMPLOYER')")
    public ResponseEntity<Material> post(@RequestBody Material material) {
        Material savedMaterial = materialRepository.save(material);
        return ResponseEntity.ok(savedMaterial);
    }

    @DeleteMapping("/{id}")
//    @PreAuthorize("hasAnyRole('EMPLOYEE', 'EMPLOYER')")
    public ResponseEntity<Material> delete(@PathVariable Integer id) {
        try {
            materialRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }catch (EmptyResultDataAccessException e){
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/place")
    public ResponseEntity<Site> getPlace(@PathVariable Integer id) {
        Optional<Material> oMaterial = materialRepository.findById(id);
        if (oMaterial.isPresent()) {
            return ResponseEntity.ok(oMaterial.get().getPlace());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/place/{placeId}")
    public ResponseEntity<Site> modifyPlace(@PathVariable Integer id, @PathVariable Integer placeId) {
        Optional<Material> oMaterial = materialRepository.findById(id);
        if (!oMaterial.isPresent()) {
            return ResponseEntity.notFound().build();
        } else {
            Material material = oMaterial.get();
            Optional<Site> oSite = siteRepository.findById(placeId);
            if (!oSite.isPresent()) {
                return ResponseEntity.notFound().build();
            } else {
                Site site = oSite.get();
                site.getMaterials().add(material);
                material.setPlace(site);
                return ResponseEntity.ok(siteRepository.save(site));
            }

        }

    }
}
