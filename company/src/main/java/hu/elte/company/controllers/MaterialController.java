package hu.elte.company.controllers;

import hu.elte.company.entities.Material;
import hu.elte.company.repositories.MaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/materials")
public class MaterialController {

    @Autowired
    private MaterialRepository materialRepository;

    @GetMapping("")
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
    public ResponseEntity<Material> get(@PathVariable Integer id) {
        Optional<Material> oMaterial = materialRepository.findById(id);
        if (!oMaterial.isPresent()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(oMaterial.get());
        }
    }

    @PostMapping("")
    public ResponseEntity<Material> post(@RequestBody Material material) {
        Material savedMaterial = materialRepository.save(material);
        return ResponseEntity.ok(savedMaterial);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Material> delete(@PathVariable Integer id) {
        try {
            materialRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }catch (EmptyResultDataAccessException e){
            return ResponseEntity.notFound().build();
        }
    }
}
