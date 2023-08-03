package com.laptech.rest.admin;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
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
import com.laptech.dao.DiscountDAO;
import com.laptech.model.Brand;
import com.laptech.model.Discount;


@RestController
public class DiscountRestController {

    
     @Autowired
    DiscountDAO dao;
    
    @GetMapping("/api/discount")
    public ResponseEntity<List<Discount>> getAll(Model model){
        return ResponseEntity.ok( dao.findAll());
    }


    @GetMapping("/api/discount/{id}")
    public ResponseEntity<Discount> getOne(@PathVariable("id") String id){
        if(!dao.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dao.findById(id).get());
    }

    @PostMapping("/api/discount")
    public ResponseEntity<Discount> post(@RequestBody Discount discount){
       dao.save(discount);
        return ResponseEntity.ok(discount);
    }

    @PutMapping("/api/discount/{id}")
    public ResponseEntity<Discount> update(@PathVariable("id") String id, @RequestBody Discount discount){
        if(!dao.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        dao.save(discount);
        return ResponseEntity.ok(discount);
    }

    @DeleteMapping("/api/discount/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") String id){
          Discount discount = dao.findById(id).get();
          if(discount == null){
            return ResponseEntity.notFound().build();
          }
      
           dao.deleteById(id);
           return ResponseEntity.ok(true);
       
    }

    // @GetMapping("/api/brand/search/{name}")
    // public ResponseEntity<List<Brand>> search(@PathVariable("name") String name){
    //     return ResponseEntity.ok(dao.findByNameLike(name));
    // }

    
    // @GetMapping("/api/brand/countries")
    // public ResponseEntity<String> getCountries() throws IOException {
    //     String jsonContent = new String(Files.readAllBytes(Paths.get(new ClassPathResource("static/countries.json").getURI())));
    //     return ResponseEntity.ok(jsonContent);
    // }
}
