package com.laptech.rest.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.laptech.dao.GraphicsCardDAO;
import com.laptech.dao.RAMDAO;

import com.laptech.model.GraphicsCard;
import com.laptech.model.RAM;

@RestController
public class GraphicsCardRestController {
    @Autowired
    GraphicsCardDAO dao;
    
    @GetMapping("/api/graphics-card")
    public ResponseEntity<List<GraphicsCard>> getAll(Model model){
        return ResponseEntity.ok( dao.findAll());
    }

     @GetMapping("/api/graphics-card/{id}")
    public ResponseEntity<GraphicsCard> getOne(@PathVariable("id") Long id){
        if(!dao.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dao.findById(id).get());
    }

    @PostMapping("/api/graphics-card")
    public ResponseEntity<GraphicsCard> post(@RequestBody GraphicsCard GraphicsCard){
       dao.save(GraphicsCard);
        return ResponseEntity.ok(GraphicsCard);
    }

    @PutMapping("/api/graphics-card/{id}")
    public ResponseEntity<GraphicsCard> update(@PathVariable("id") Long id, @RequestBody GraphicsCard GraphicsCard){
        if(!dao.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        dao.save(GraphicsCard);
        return ResponseEntity.ok(GraphicsCard);
    }

    @DeleteMapping("/api/graphics-card/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") Long id){
          GraphicsCard GraphicsCard = dao.findById(id).get();
          if(GraphicsCard == null){
            return ResponseEntity.notFound().build();
          }
        //   if(!GraphicsCard.getProducts().isEmpty()){ 
        //     return ResponseEntity.badRequest().build();
        //   }
           dao.deleteById(id);
           return ResponseEntity.ok(true);
       
    }

    @GetMapping("/api/graphics-card/search/{name}")
    public ResponseEntity<List<GraphicsCard>> search(@PathVariable("name") String name){
        return ResponseEntity.ok(dao.findByNameLike(name));
    }
}
