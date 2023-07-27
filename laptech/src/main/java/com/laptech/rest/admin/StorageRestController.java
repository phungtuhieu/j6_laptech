package com.laptech.rest.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laptech.dao.StorageDAO;
import com.laptech.model.Storage;

@RestController
public class StorageRestController {
    @Autowired
    StorageDAO dao;
    
    @GetMapping("/api/storage")
    public ResponseEntity<List<Storage>> getAll(Model model){
        return ResponseEntity.ok( dao.findAll());
    }
}
