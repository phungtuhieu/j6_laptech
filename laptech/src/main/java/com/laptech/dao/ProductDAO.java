package com.laptech.dao;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.laptech.model.Product;
import com.laptech.model.ReportFavoriteProduct;
import com.laptech.model.ReportFavoriteChart;
import com.laptech.model.ReportProductSold;
import com.laptech.model.ReportProductSoldChart;

public interface ProductDAO extends JpaRepository<Product,Long>{

    @Query("SELECT p FROM Product p WHERE p.name LIKE CONCAT('%', :keyword, '%') "+
    "or p.category.name LIKE CONCAT('%',:keyword,'%') "+ 
    "or p.brand.name LIKE CONCAT('%',:keyword,'%')")
    Page<Product> findByName(@Param("keyword") String keyword, Pageable pageable);


    
    Optional<Product> findById(Long id);

    
    @Query("SELECT p FROM Product p JOIN p.prices price WHERE p.status = 1 AND p.id = price.product AND CURRENT_TIMESTAMP BETWEEN price.startDate AND  ISNULL(price.endDate, CURRENT_TIMESTAMP)")
    List<Product> findByProductInDateAndStatus();

    



    @Query("SELECT p FROM Product p JOIN p.prices pr WHERE p.status = 1 AND CURRENT_TIMESTAMP BETWEEN pr.startDate AND  ISNULL(pr.endDate, CURRENT_TIMESTAMP)  AND p.brand.name LIKE %:name%")
    List<Product> findByProductBrandName(@Param("name") String name);

    

     @Query("SELECT new com.laptech.model.ReportFavoriteProduct(p.name, p.category.name, COUNT(f), MIN(f.likedDate), MAX(f.likedDate)) "
        + " FROM Product p JOIN p.favorites f "
        + " GROUP BY p.category.name, p.name"
        + " ORDER BY COUNT(f) DESC")
    List<ReportFavoriteProduct> getFavoriteBook();

    @Query("SELECT new com.laptech.model.ReportFavoriteProduct(p.name, p.category.name, COUNT(f), MIN(f.likedDate), MAX(f.likedDate)) "
            + " FROM Product p JOIN p.favorites f "
            + " WHERE p.name LIKE CONCAT('%', :name, '%') "
            + " GROUP BY p.category.name, p.name"
            + " ORDER BY COUNT(f) DESC")
    List<ReportFavoriteProduct> getFavoriteBookName(@Param("name") String name);

    @Query("SELECT new com.laptech.model.ReportFavoriteProduct(p.name, p.category.name, COUNT(f), MIN(f.likedDate), MAX(f.likedDate)) "
            + " FROM Product p JOIN p.favorites f "
            + " WHERE f.likedDate BETWEEN :startDate AND :endDate "
            + " GROUP BY p.category.name, p.name"
            + " ORDER BY COUNT(f) DESC")
    List<ReportFavoriteProduct> getFavoriteDate(@Param("startDate") Date startDate, @Param("endDate") Date endDate);


        @Query("SELECT new com.laptech.model.ReportFavoriteChart(COUNT(*), MONTH(f.likedDate))"
        + " FROM Favorite f "
        + " WHERE YEAR(f.likedDate) = :year"
        + " GROUP BY MONTH(f.likedDate)")
    List<ReportFavoriteChart> getFavoriteChart(@Param("year") Integer year);


        @Query("SELECT YEAR(f.likedDate) FROM Favorite f GROUP BY YEAR(f.likedDate) ORDER BY YEAR(f.likedDate) DESC")
        List<Integer> getFavoriteAllYear();


        @Query("SELECT new com.laptech.model.ReportProductSoldChart(COUNT(*), MONTH(od.order.orderDate))"
        + " FROM OrderDetail od "
        + " WHERE YEAR(od.order.orderDate) = :year AND od.order.status = '2' "
        + " GROUP BY MONTH(od.order.orderDate)")
    List<ReportProductSoldChart> getProductSoldChart(@Param("year") Integer year);

    @Query("SELECT YEAR(od.order.orderDate)"
        + " FROM OrderDetail od "
        + " WHERE od.order.status = '2'"
        + " GROUP BY YEAR(od.order.orderDate) ORDER BY YEAR(od.order.orderDate)  ")
    List<Integer> getAllProductSoldYear();
        


    @Query("SELECT new com.laptech.model.ReportProductSold(p.name,o.orderDate , SUM(od.quantity), SUM(od.quantity * price.price)) "
    + " FROM OrderDetail od "
    + " JOIN od.product p "
    + " JOIN od.order o "
    + " JOIN p.prices price "
    + " WHERE o.status = 2 "
    + " GROUP BY p.name,o.orderDate "
    + " ORDER BY o.orderDate  DESC")
List<ReportProductSold> getProductSold();

    @Query("SELECT new com.laptech.model.ReportProductSold(p.name,o.orderDate , SUM(od.quantity), SUM(od.quantity * price.price)) "
    + " FROM OrderDetail od "
    + " JOIN od.product p "
    + " JOIN od.order o "
    + " JOIN p.prices price "
    + " WHERE o.status = 2 AND "
    + " p.name LIKE CONCAT('%', :name, '%') " 
    + " GROUP BY p.name,o.orderDate "
    + " ORDER BY o.orderDate  DESC")
List<ReportProductSold> getProductSoldName(@Param("name") String name);

    @Query("SELECT new com.laptech.model.ReportProductSold(p.name,o.orderDate , SUM(od.quantity), SUM(od.quantity * price.price)) "
    + " FROM OrderDetail od "
    + " JOIN od.product p "
    + " JOIN od.order o "
    + " JOIN p.prices price "
    + " WHERE o.status = 2 AND "
    + "o.orderDate  BETWEEN :startDate AND :endDate"
    + " GROUP BY p.name,o.orderDate "
    + " ORDER BY o.orderDate  DESC")
List<ReportProductSold> getProductSoldDate(@Param("startDate") Date startDate, @Param("endDate") Date endDate);






}
