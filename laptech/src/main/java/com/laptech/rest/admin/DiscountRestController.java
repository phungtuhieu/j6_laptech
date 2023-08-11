package com.laptech.rest.admin;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.laptech.dao.BrandDAO;
import com.laptech.dao.DiscountDAO;
import com.laptech.dao.DiscountPriceDAO;
import com.laptech.dao.PriceDAO;
import com.laptech.model.Brand;
import com.laptech.model.Discount;
import com.laptech.model.DiscountPrice;
import com.laptech.model.DiscountPricePK;
import com.laptech.model.Price;


@RestController
public class DiscountRestController {

    
     @Autowired
    DiscountDAO dao;
    @Autowired
    PriceDAO prDao;
    @Autowired
    DiscountPriceDAO dpDao;
    
    @GetMapping("/api/discount")
    public ResponseEntity<List<Discount>> getAll(){
        return ResponseEntity.ok( dao.findAll());
    }


     @GetMapping("/api/discount/betweenDate")
    public ResponseEntity<List<Discount>> getAllBetweenDate(){
        return ResponseEntity.ok(dao.findByBetweenDate());
    }

    @GetMapping("/api/discount/notBetweenDate")
    public ResponseEntity<List<Discount>> getAllNotBetweenDate(){
        return ResponseEntity.ok(dao.findByNotBetweenDate());
    }


    @GetMapping("/api/discount/{id}")
    public ResponseEntity<Discount> getOne(@PathVariable("id") String id){
        if(!dao.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dao.findById(id).get());
    }

    @PostMapping("/api/discount")
    public ResponseEntity<Discount> post(@RequestBody Discount discount){
        dao.save(discount);
        return ResponseEntity.ok(discount);
    }

    @PutMapping("/api/discount/{id}")
    public ResponseEntity<Discount> update(@PathVariable("id") String id, @RequestBody Discount discount){
        if(!dao.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        dao.save(discount);
        return ResponseEntity.ok(discount);
    }

    @DeleteMapping("/api/discount/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") String id){
          Discount discount = dao.findById(id).get();
          if(discount == null){
            return ResponseEntity.notFound().build();
          }
      
           dao.deleteById(id);
           return ResponseEntity.ok(true);
       
    }

    @GetMapping("/api/discount/search/{name}")
    public ResponseEntity<List<Discount>> search(@PathVariable("name") String name){
        return ResponseEntity.ok(dao.findByNameLike(name));
    }

    @GetMapping("/api/discount/PriceByProduct")
    public ResponseEntity<List<Price>> PriceByProductAndDiscount(){
        return ResponseEntity.ok(prDao.findByPriceByProductNotInDiscount());
    }

    @GetMapping("/api/discount/PriceByProductInDiscountPrice/{name}")
    public ResponseEntity<List<Price>> PriceByProductInDiscountPrice(@PathVariable("name") String name){
        return ResponseEntity.ok(prDao.findByPriceByProductInDiscount(name));
    }

    @GetMapping("/api/discount/PriceByProduct/{nameAndBrand}")
    public ResponseEntity<List<Price>> findByPriceByProductNameAndBrandName(@PathVariable("nameAndBrand") String nameAndBrand){
        return ResponseEntity.ok(prDao.findByPriceByProductNameAndBrandName(nameAndBrand));
    }

    @GetMapping("/api/discount/price/{id}")
    public ResponseEntity<Optional<Price>> findByPriceId(@PathVariable("id") Long id){
        return ResponseEntity.ok(prDao.findById(id));
    }


    @PostMapping("/api/discount-price")
    public ResponseEntity<DiscountPrice> discountPrice(@RequestBody DiscountPrice discountPrice){
        DiscountPricePK discountPricePK = new DiscountPricePK();
        discountPricePK.setDiscountId(discountPrice.getDiscount().getId());;
        discountPricePK.setPriceId(discountPrice.getPrice().getId());
        discountPrice.setDiscountPricePK(discountPricePK);
        dpDao.save(discountPrice);
        return ResponseEntity.ok(discountPrice);
    }


    @PostMapping("/api/discount-price-update")
    public ResponseEntity<DiscountPrice> discountPriceUpdate(@RequestBody DiscountPrice discountPrice){
        DiscountPricePK discountPricePK = new DiscountPricePK();
        discountPricePK.setDiscountId(discountPrice.getDiscount().getId());;
        discountPricePK.setPriceId(discountPrice.getPrice().getId());
        discountPrice.setDiscountPricePK(discountPricePK);
        dpDao.save(discountPrice);


        return ResponseEntity.ok(discountPrice);
    }

    @GetMapping("/api/discount-price-delete/{discountId}")
    public ResponseEntity<Boolean> deleteDiscountPrice(@PathVariable("discountId") String name){

         List<DiscountPrice> dpList = dpDao.findByDiscountIdAll(name);
         dpList.forEach((dp) -> {
            DiscountPricePK discountPricePKDelete = new DiscountPricePK();
            discountPricePKDelete.setDiscountId(dp.getDiscount().getId());
            discountPricePKDelete.setPriceId(dp.getPrice().getId());
            dp.setDiscountPricePK(discountPricePKDelete);
            dpDao.deleteById(discountPricePKDelete);
        });

        return ResponseEntity.ok(true);
    }
  

    @GetMapping("/api/price-by-discountId-AndNotIn-discountPrice/{discountId}")
    public ResponseEntity<List<Price>> priceInNout(@PathVariable("discountId") String name){
        return ResponseEntity.ok(prDao.findByPriceDiscountIdAndNotInDiscountPrice(name));
    }

    @GetMapping("/api/price-by-discountId-AndNotIn-discountPrice/search/{discountId}/{name}")
    public ResponseEntity<List<Price>> findByPriceDiscountIdAndNotInDiscountPriceSearch(@PathVariable("discountId") String discountId, @PathVariable("name") String name){
        return ResponseEntity.ok(prDao.findByPriceDiscountIdAndNotInDiscountPriceSearch(discountId,name));
    }





}
