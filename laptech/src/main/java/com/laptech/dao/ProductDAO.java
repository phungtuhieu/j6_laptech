package com.laptech.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.laptech.model.Category;
import com.laptech.model.Product;
import com.laptech.model.ReportFavoriteProduct;
import com.laptech.model.ReportProductSold;

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



    @Query("SELECT new com.laptech.model.ReportProductSold(p.name, CAST(o.orderDate AS DATE), SUM(od.quantity), SUM(od.quantity * price.price)) "
    + " FROM OrderDetail od "
    + " JOIN od.product p "
    + " JOIN od.order o "
    + " JOIN p.prices price "
    + " WHERE o.status = 3 "
    + " GROUP BY p.name, CAST(o.orderDate AS DATE)"
    + " ORDER BY CAST(o.orderDate AS DATE) DESC")
List<ReportProductSold> getProductSold();

    @Query("SELECT new com.laptech.model.ReportProductSold(p.name, CAST(o.orderDate AS DATE), SUM(od.quantity), SUM(od.quantity * price.price)) "
    + " FROM OrderDetail od "
    + " JOIN od.product p "
    + " JOIN od.order o "
    + " JOIN p.prices price "
    + " WHERE o.status = 3 AND "
    + " p.name LIKE CONCAT('%', :name, '%') " 
    + " GROUP BY p.name, CAST(o.orderDate AS DATE)"
    + " ORDER BY CAST(o.orderDate AS DATE) DESC")
List<ReportProductSold> getProductSoldName(@Param("name") String name);

    @Query("SELECT new com.laptech.model.ReportProductSold(p.name, CAST(o.orderDate AS DATE), SUM(od.quantity), SUM(od.quantity * price.price)) "
    + " FROM OrderDetail od "
    + " JOIN od.product p "
    + " JOIN od.order o "
    + " JOIN p.prices price "
    + " WHERE o.status = 3 AND "
    + " CAST(o.orderDate AS DATE) BETWEEN :startDate AND :endDate"
    + " GROUP BY p.name, CAST(o.orderDate AS DATE)"
    + " ORDER BY CAST(o.orderDate AS DATE) DESC")
List<ReportProductSold> getProductSoldDate(@Param("startDate") Date startDate, @Param("endDate") Date endDate);





}
