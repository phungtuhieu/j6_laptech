package com.laptech.rest.admin;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.laptech.dao.BrandDAO;
import com.laptech.model.Brand;


@RestController
public class BrandRestController {

    
     @Autowired
    BrandDAO dao;
    
    @GetMapping("/api/brand")
    public ResponseEntity<List<Brand>> getAll(Model model){
        return ResponseEntity.ok( dao.findAll());
    }


    @GetMapping("/api/brand/{id}")
    public ResponseEntity<Brand> getOne(@PathVariable("id") Long id){
        if(!dao.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dao.findById(id).get());
    }

    @PostMapping("/api/brand")
    public ResponseEntity<Brand> post(@RequestBody Brand brand){
       dao.save(brand);
        return ResponseEntity.ok(brand);
    }

    @PutMapping("/api/brand/{id}")
    public ResponseEntity<Brand> update(@PathVariable("id") Long id, @RequestBody Brand brand){
        if(!dao.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        dao.save(brand);
        return ResponseEntity.ok(brand);
    }

    @DeleteMapping("/api/brand/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") Long id){
          Brand brand = dao.findById(id).get();
          if(brand == null){
            return ResponseEntity.notFound().build();
          }
      
           dao.deleteById(id);
           return ResponseEntity.ok(true);
       
    }

    @GetMapping("/api/brand/search/{name}")
    public ResponseEntity<List<Brand>> search(@PathVariable("name") String name){
        return ResponseEntity.ok(dao.findByNameLike(name));
    }

    
    @GetMapping("/api/brand/countries")
    public ResponseEntity<String> getCountries() throws IOException {
        String jsonContent = new String(Files.readAllBytes(Paths.get(new ClassPathResource("static/countries.json").getURI())));
        return ResponseEntity.ok(jsonContent);
    }
}
