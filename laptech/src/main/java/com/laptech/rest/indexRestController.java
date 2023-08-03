package com.laptech.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laptech.dao.PriceDAO;
import com.laptech.dao.ProductDAO;
import com.laptech.model.Brand;
import com.laptech.model.Price;
import com.laptech.model.Product;

@RestController
public class indexRestController {


    @Autowired
    ProductDAO pddao;

     @Autowired
    PriceDAO prdao;
    
    @GetMapping("/api/index")
    public ResponseEntity<List<Price>> getAll(Model model){
        return ResponseEntity.ok(prdao.findAll());
    }

    
}
