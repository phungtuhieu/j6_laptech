package com.laptech.rest.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laptech.dao.GraphicsCardDAO;
import com.laptech.model.GraphicsCard;

@RestController
public class GraphicsCardController {
    @Autowired
    GraphicsCardDAO dao;
    
    @GetMapping("/api/graphics-card")
    public ResponseEntity<List<GraphicsCard>> getAll(Model model){
        return ResponseEntity.ok( dao.findAll());
    }
}
