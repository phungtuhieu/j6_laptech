package com.laptech.rest.admin;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.laptech.dao.ProductDAO;
import com.laptech.dao.ProductImagesDAO;
import com.laptech.model.Price;
import com.laptech.model.Product;
import com.laptech.model.ProductImages;
import com.laptech.service.FileManagerService;

@RestController
@RequestMapping("/api/product")
public class ProductRestController {
    @Autowired
    ProductDAO dao;

    @Autowired
    ProductImagesDAO pImgDao;

    @Autowired
    FileManagerService fileService;

    @GetMapping
    public ResponseEntity<List<Product>> getAll(Model model){
        return ResponseEntity.ok( dao.findAll());
    }

    @GetMapping("{id}")
    public ResponseEntity<Product> getOne(@PathVariable("id") Long id){
       if(!dao.existsById(id)){
            return ResponseEntity.badRequest().build();
       }
        return ResponseEntity.ok(dao.findById(id).get());
    }
 

    @PostMapping
    public ResponseEntity<Product> post(@RequestBody Product product){
       Product prod = dao.save(product);
       return ResponseEntity.ok(prod);
    }

    @PutMapping("{id}")
    public ResponseEntity<Product> update(@PathVariable("id") Long id, @RequestBody Product product){
        if(!dao.existsById(product.getId())){
             return ResponseEntity.notFound().build();
        }
       Product prod = dao.save(product);
       return ResponseEntity.ok(prod);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id){
        if(!dao.existsById(id)){
             return ResponseEntity.notFound().build();
        }
        dao.deleteById(id);
        return ResponseEntity.ok().build();
    }

  
    @PostMapping("/img/save")
    public ResponseEntity<List<ProductImages>> saveImg(@RequestBody  List<ProductImages> prodImages) {
        for (ProductImages pImg : prodImages) {
            pImgDao.save(pImg);
        }
        return ResponseEntity.ok(prodImages)  ;
    }
    @GetMapping("/img/load-form/{idProd}")
    public ResponseEntity<List<ProductImages>> loadImgToForm(@PathVariable("idProd") Long idProd) {
    	
    	List<ProductImages> listProdImg = new ArrayList<>();
        if(!dao.existsById(idProd)){
            return ResponseEntity.notFound().build();
        }else {
        	Product product = dao.findById(idProd).get();
        	listProdImg = product.getProductImages();
       }
        return ResponseEntity.ok(listProdImg)  ;
    }
    
    @DeleteMapping("/img/delete/{id}")
    public ResponseEntity<Void> updateImg(@PathVariable("id") Long idProd) {
     if(!pImgDao.existsById(idProd)){
    	            return ResponseEntity.notFound().build();
    	        }else {
    	        	pImgDao.deleteById(idProd);
    	       }
	
      
        return ResponseEntity.ok().build()  ;
    }
    @PostMapping("/price")
    public ResponseEntity<Void> createPrice(List<Price> prices) {
        System.out.println(prices.get(0).getPrice());
        return ResponseEntity.ok().build()  ;
    }
}

