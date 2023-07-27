package com.laptech.rest.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
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
}
