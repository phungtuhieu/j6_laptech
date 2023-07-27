package com.laptech.rest.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laptech.dao.CPUDAO;
import com.laptech.model.CPU;

@RestController
public class CpuRestController {
    @Autowired
    CPUDAO dao;
    @GetMapping("/api/cpu")
    public ResponseEntity<List<CPU>> getAll(Model model){
        return ResponseEntity.ok( dao.findAll());
    }

}
