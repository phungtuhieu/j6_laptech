package com.laptech.rest.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laptech.dao.ScreenSizeDAO;
import com.laptech.model.ScreenSize;

@RestController
public class ScreenSizeRestController {
    @Autowired
    ScreenSizeDAO dao;
    
    @GetMapping("/api/screen-size")
    public ResponseEntity<List<ScreenSize>> getAll(Model model){
        return ResponseEntity.ok( dao.findAll());
    }
}
