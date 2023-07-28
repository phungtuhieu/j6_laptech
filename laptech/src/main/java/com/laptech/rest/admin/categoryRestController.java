package com.laptech.rest.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.laptech.dao.CategoryDAO;
import com.laptech.model.Category;

@CrossOrigin("*")
@RestController
public class categoryRestController {

    @Autowired
    CategoryDAO dao;

     @GetMapping("/api/category")
    public ResponseEntity<List<Category>> getAll(Model model){
        return ResponseEntity.ok(dao.findAll());
    }

     @GetMapping("/api/category/{id}")
    public ResponseEntity<Category> getOne(@PathVariable("id") Long id){
        if(!dao.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dao.findById(id).get());
    }

    @PostMapping("/api/category")
    public ResponseEntity<Category> post(@RequestBody Category category){
       dao.save(category);
        return ResponseEntity.ok(category);
    }

    @PutMapping("/api/category/{id}")
    public ResponseEntity<Category> update(@PathVariable("id") Long id, @RequestBody Category category){
        if(!dao.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        dao.save(category);
        return ResponseEntity.ok(category);
    }

    @DeleteMapping("/api/category/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") Long id){
          Category category = dao.findById(id).get();
          if(category == null){
            return ResponseEntity.notFound().build();
          }
        //   if(!category.getProducts().isEmpty()){ 
        //     return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();
        //   }
           dao.deleteById(id);
           return ResponseEntity.ok(true);
       
    }

    @GetMapping("/api/category/search/{name}")
    public ResponseEntity<List<Category>> search(@PathVariable("name") String name){
        return ResponseEntity.ok(dao.findByNameLike(name));
    }
    
}
