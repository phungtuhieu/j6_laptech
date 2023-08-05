package com.laptech.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.laptech.dao.BrandDAO;
import com.laptech.dao.DiscountDAO;
import com.laptech.dao.DiscountPriceDAO;
import com.laptech.dao.PriceDAO;
import com.laptech.dao.ProductDAO;
import com.laptech.dao.ProductImagesDAO;
import com.laptech.model.Brand;
import com.laptech.model.Discount;
import com.laptech.model.DiscountPrice;
import com.laptech.model.Price;
import com.laptech.model.Product;
import com.laptech.model.ProductImages;

@RestController
public class indexRestController {


    @Autowired
    ProductDAO pdDao;

    @Autowired
    PriceDAO prDao;

    @Autowired 
    ProductImagesDAO imgDao;

    @Autowired
    BrandDAO bDao;

    @Autowired
    DiscountPriceDAO dcDao;
    
    @GetMapping("/api/productItems")
    public ResponseEntity<List<Product>> getAll(Model model){
        return ResponseEntity.ok(pdDao.findAll());
    }

    @GetMapping("/api/price")
    public ResponseEntity<List<Price>> getAllPrice(Model model){
        return ResponseEntity.ok(prDao.findAll());
    }

    @GetMapping("/api/findPricesWithoutDiscountPrices")
    public ResponseEntity<List<Price>> findPricesWithoutDiscountPrices(Model model){
        return ResponseEntity.ok(prDao.findPricesWithoutDiscountPrices());
    }

    @GetMapping("/api/img")
    public ResponseEntity<List<ProductImages>> getAllImg(Model model){
        return ResponseEntity.ok(imgDao.findAll());
    }
    @GetMapping("/api/img/{productId}")
    public ResponseEntity<List<ProductImages>> getAllProductId(@PathVariable("productId") Long productId){
        return ResponseEntity.ok(imgDao.findByProduct(productId));
    }

    @GetMapping("/api/brandAll")
    public ResponseEntity<List<Brand>> getAllBrands(Model model){
        return ResponseEntity.ok(bDao.findAll());
    }

    @GetMapping("/api/product/brand/{name}")
    public ResponseEntity<List<Product>> getAllBrands(@PathVariable("name") String name){
        return ResponseEntity.ok(pdDao.findByProductBrandName(name));
    }
    
    @GetMapping("/api/discountPriceAll")
    public ResponseEntity<List<DiscountPrice>> getAllDiscount(Model model){
        return ResponseEntity.ok(dcDao.findByDiscountAndPriceId());
    }



    
}
