package com.laptech.rest.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.laptech.dao.ProductDAO;
import com.laptech.model.Product;

@RestController
public class ProductRestController {
    @Autowired
    ProductDAO dao;

    @GetMapping("/api/product")
    public ResponseEntity<List<Product>> getAll(Model model){
        return ResponseEntity.ok( dao.findAll());
    }

    @GetMapping("/api/product/{id}")
    public ResponseEntity<Product> getOne(@PathVariable("id") Long id){
       if(!dao.existsById(id)){
            return ResponseEntity.badRequest().build();
       }
        return ResponseEntity.ok(dao.findById(id).get());
    }
   

    // @PostMapping("/api/product")
    // public ResponseEntity<Product> post(@RequestBody Product Product){
    
    // }

    // @PutMapping("/api/product/{id}")
    // public ResponseEntity<Product> update(@PathVariable("id") Long id, @RequestBody Product product){
       
    // }

    // @DeleteMapping("/api/product/{id}")
    // public ResponseEntity<Boolean> delete(@PathVariable("id") Long id){
        
    // }

    // @GetMapping("/api/product/search/{ten}")
    // public ResponseEntity<Product> search(@PathVariable("id") Long id){
      
    // }
    
}
