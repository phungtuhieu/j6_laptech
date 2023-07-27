package com.laptech.rest.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laptech.dao.OperatingSystemDAO;
import com.laptech.model.OperatingSystem;

@RestController
public class OperatingSystemRestController {
    @Autowired
    OperatingSystemDAO dao;

    @GetMapping("/api/operating-system")
    public ResponseEntity<List<OperatingSystem>> getAll(Model model){
        return ResponseEntity.ok( dao.findAll());
    }
}
