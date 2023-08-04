package com.laptech.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.laptech.dao.PriceDAO;
import com.laptech.dao.ProductDAO;
import com.laptech.dao.ProductImagesDAO;
import com.laptech.model.Brand;
import com.laptech.model.Price;
import com.laptech.model.Product;
import com.laptech.model.ProductImages;

@RestController
public class indexRestController {


    @Autowired
    ProductDAO pddao;

    @Autowired
    PriceDAO prdao;

    @Autowired 
    ProductImagesDAO imgdao;
    
    @GetMapping("/api/productItems")
    public ResponseEntity<List<Product>> getAll(Model model){
        return ResponseEntity.ok(pddao.findAll());
    }

    @GetMapping("/api/price")
    public ResponseEntity<List<Price>> getAllPrice(Model model){
        return ResponseEntity.ok(prdao.findAll());
    }

    @GetMapping("/api/img")
    public ResponseEntity<List<ProductImages>> getAllImg(Model model){
        return ResponseEntity.ok(imgdao.findAll());
    }
    @GetMapping("/api/img/{productId}")
    public ResponseEntity<List<ProductImages>> getAllProductId(@PathVariable("productId") Long productId){
        return ResponseEntity.ok(imgdao.findByProduct(productId));
    }




    
}
