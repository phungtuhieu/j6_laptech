package com.laptech.rest.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.laptech.dao.RAMDAO;

import com.laptech.model.RAM;

@RestController
public class RamRestController {
    @Autowired
    RAMDAO dao;
    
    @GetMapping("/api/ram")
    public ResponseEntity<List<RAM>> getAll(Model model){
        return ResponseEntity.ok( dao.findAll());
    }

     @GetMapping("/api/ram/{id}")
    public ResponseEntity<RAM> getOne(@PathVariable("id") Long id){
        if(!dao.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dao.findById(id).get());
    }

    @PostMapping("/api/ram")
    public ResponseEntity<RAM> post(@RequestBody RAM ram){
        dao.save(ram);
        return ResponseEntity.ok(ram);
    }

    @PutMapping("/api/ram/{id}")
    public ResponseEntity<RAM> update(@PathVariable("id") Long id, @RequestBody RAM ram){
        if(!dao.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        dao.save(ram);
        return ResponseEntity.ok(ram);
    }

    @DeleteMapping("/api/ram/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") Long id){
          RAM ram = dao.findById(id).get();
          if(ram == null){
            return ResponseEntity.notFound().build();
          }
           dao.deleteById(id);
           return ResponseEntity.ok(true);
       
    }

    @GetMapping("/api/ram/search/{name}")
    public ResponseEntity<List<RAM>> search(@PathVariable("name") String name){
        return ResponseEntity.ok(dao.findByNameLike(name));
    }
}
