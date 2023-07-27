package com.laptech.rest.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
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
}
