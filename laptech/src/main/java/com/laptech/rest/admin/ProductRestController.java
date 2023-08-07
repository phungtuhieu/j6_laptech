package com.laptech.rest.admin;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.laptech.dao.PriceDAO;
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
    PriceDAO priceDao;

    @Autowired
    FileManagerService fileService;

    @GetMapping
    public ResponseEntity<Page<Product>> getAll(@RequestParam("pageNo") Optional<Integer> pageNo){
        Pageable pageable = PageRequest.of(pageNo.orElse(0), 5);
        Page<Product> page  = dao.findAll(pageable);
        return ResponseEntity.ok(page);
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
        } else {
            Product prod = dao.findById(id).get();
            if(!prod.getOrderDetails().isEmpty()) {
                 return new ResponseEntity<>(HttpStatus.CONFLICT);
            } else {
                List<ProductImages> listPImg = pImgDao.findByProduct(prod);
                List<Price> listPrice = priceDao.findByProduct(prod);
                if(!listPImg.isEmpty()) {
                    for (ProductImages pimg : listPImg) {
                    pImgDao.deleteById(pimg.getId());
                    fileService.delete("images", pimg.getName());
                }
                }
                if(!listPrice.isEmpty()) {
                  for (Price p : listPrice) {
                    priceDao.deleteById(p.getId());
                   }
                }
               
                
                
                dao.deleteById(id);
            }
        }
       
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
    public ResponseEntity<List<Price>> createPrice(@RequestBody List<Price> listPrice) {
        List<Price> list = new ArrayList<>();
        for (Price price : listPrice) {
            System.out.println(price.getPrice());
            list.add(priceDao.save(price)); 
        }
       
        return ResponseEntity.ok(list)  ;
    }
    @GetMapping ("/price/{idProd}")
    public ResponseEntity<List<Price>> getlistPrice(@PathVariable("idProd") Long id) {
        if(!dao.existsById(id)) {
            ResponseEntity.notFound().build() ;
        } 
        Product prod = dao.findById(id).get();
        return ResponseEntity.ok(priceDao.findByProduct(prod)) ;
    }
    @PutMapping ("/price/{id}")
    public ResponseEntity<Price> updatePrice(@PathVariable("id") Long id,@RequestBody Price price) {
        if(!priceDao.existsById(id)) {
            ResponseEntity.notFound().build() ;
        } 
        return ResponseEntity.ok(priceDao.save(price)) ;
    }
}

