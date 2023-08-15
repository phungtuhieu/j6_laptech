package com.laptech.rest.admin;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.laptech.dao.CategoryDAO;
import com.laptech.dao.ProductDAO;
import com.laptech.model.ReportFavoriteChart;
import com.laptech.model.ReportFavoriteProduct;
import com.laptech.model.ReportProductSold;
import com.laptech.model.ReportProductSoldChart;



@CrossOrigin("*")
@RestController
public class ReportRestController {

    @Autowired
    ProductDAO dao;

    @GetMapping("/api/favoriteProduct")
    public ResponseEntity<List<ReportFavoriteProduct>> getAll(){
        return ResponseEntity.ok(dao.getFavoriteBook());
    }

    @GetMapping("/api/favoriteProduct/{name}")
    public ResponseEntity<List<ReportFavoriteProduct>> getNameFavorite(@PathVariable("name") String name){
        return ResponseEntity.ok(dao.getFavoriteBookName(name));
    }

    @GetMapping("/api/favoriteProduct/{startdate}/{enddate}")
    public ResponseEntity<List<ReportFavoriteProduct>> getDateFavorite(
        @PathVariable("startdate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
        @PathVariable("enddate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate
    ) {
        List<ReportFavoriteProduct> favorites = dao.getFavoriteDate(startDate, endDate);
        return ResponseEntity.ok(favorites);
    }


    @GetMapping("/api/favoriteChart/{year}")
    public ResponseEntity<List<ReportFavoriteChart>> getAllFavoriteChart(@PathVariable("year") Integer year){
        return ResponseEntity.ok(dao.getFavoriteChart(year));
    }

    @GetMapping("/api/favoriteAllYear")
     public ResponseEntity<List<Integer>> getAllYear(){
        return ResponseEntity.ok(dao.getFavoriteAllYear());
    }

    // 

    @GetMapping("/api/ProductSold")
    public ResponseEntity<List<ReportProductSold>> getAllProductSold(){
        return ResponseEntity.ok(dao.getProductSold());
    }


    @GetMapping("/api/ProductSold/{name}")
    public ResponseEntity<List<ReportProductSold>> getNameSold(@PathVariable("name") String name){
        return ResponseEntity.ok(dao.getProductSoldName(name));
    }


    @GetMapping("/api/ProductSold/{startdate}/{enddate}")
    public ResponseEntity<List<ReportProductSold>> getDateSold(
        @PathVariable("startdate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
        @PathVariable("enddate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate
    ) {
        List<ReportProductSold> favorites = dao.getProductSoldDate(startDate, endDate);
        return ResponseEntity.ok(favorites);
    }
   
     @GetMapping("/api/productSoldChart/{year}")
    public ResponseEntity<List<ReportProductSoldChart>> getAllProductSoldChart(@PathVariable("year") Integer year){
        return ResponseEntity.ok(dao.getProductSoldChart(year));
    }

     @GetMapping("/api/productSoldAllYear")
     public ResponseEntity<List<Integer>> getAllProductSoldYear(){
        return ResponseEntity.ok(dao.getAllProductSoldYear());
    }
    
}
