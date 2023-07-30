package com.laptech.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.laptech.model.Category;
import com.laptech.model.Product;
import com.laptech.model.ReportFavoriteProduct;

public interface ProductDAO extends JpaRepository<Product,Long>{


    

     @Query("SELECT new com.laptech.model.ReportFavoriteProduct(p.name, p.category.name, COUNT(f), MIN(f.likedDate), MAX(f.likedDate)) "
        + " FROM Product p JOIN p.favorites f "
        + " GROUP BY p.category.name, p"
        + " ORDER BY COUNT(f) DESC")
    List<ReportFavoriteProduct> getFavoriteBook();

    @Query("SELECT new com.laptech.model.ReportFavoriteProduct(p.name, p.category.name, COUNT(f), MIN(f.likedDate), MAX(f.likedDate)) "
            + " FROM Product p JOIN p.favorites f "
            + " WHERE p.name LIKE CONCAT('%', :name, '%') "
            + " GROUP BY p.category.name, p"
            + " ORDER BY COUNT(f) DESC")
    List<ReportFavoriteProduct> getFavoriteBookName(@Param("name") String name);

    @Query("SELECT new com.laptech.model.ReportFavoriteProduct(p.name, p.category.name, COUNT(f), MIN(f.likedDate), MAX(f.likedDate)) "
            + " FROM Product p JOIN p.favorites f "
            + " WHERE f.likedDate BETWEEN :startDate AND :endDate "
            + " GROUP BY p.category.name, p"
            + " ORDER BY COUNT(f) DESC")
    List<ReportFavoriteProduct> getFavoriteDate(@Param("startDate") Date startDate, @Param("endDate") Date endDate);


}
