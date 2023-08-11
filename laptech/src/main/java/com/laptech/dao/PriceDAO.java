package com.laptech.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.laptech.model.Brand;
import com.laptech.model.Price;
import com.laptech.model.Product;

public interface PriceDAO extends JpaRepository<Price,Long> {
    List<Price> findByProduct(Product product);

    @Query(" SELECT p FROM Price p WHERE p.product  = ?1 AND CURRENT_TIMESTAMP  BETWEEN p.startDate AND p.endDate")
    Price findByProductAndDateNowBetween(Product product);

    @Query("SELECT pr FROM Price pr WHERE pr.product.status = 1 AND CURRENT_TIMESTAMP BETWEEN pr.startDate AND pr.endDate")
    List<Price> findByPriceInDate();


    @Query("SELECT p FROM Price p WHERE p.id NOT IN " +
        "(SELECT dp.price.id  FROM DiscountPrice dp "
        + "WHERE dp.discount.id = dp.discount.id "
        + "AND dp.discount.active = true "
        + "AND CURRENT_TIMESTAMP BETWEEN dp.discount.startDate AND dp.discount.endDate "
        + "AND dp.price.id = dp.price.id)")    
    List<Price> findPricesWithoutDiscountPrices();


    @Query("SELECT pr FROM Price pr " +
       "WHERE pr.product.status = 1 " +
       "AND CURRENT_TIMESTAMP BETWEEN pr.startDate AND pr.endDate " +
       "AND pr.product.id NOT IN " +
       "(SELECT p.id FROM Product p JOIN p.prices pr JOIN pr.discountPrices dp " +
       "WHERE CURRENT_TIMESTAMP BETWEEN dp.discount.startDate AND dp.discount.endDate)")
        List<Price> findByPriceByProductNotInDiscount();


        @Query("SELECT pr FROM Price pr " +
        "WHERE pr.product.status = 1 " +
        "AND (pr.product.name LIKE CONCAT('%', ?1, '%') OR pr.product.brand.name = ?1) " + 
        "AND CURRENT_TIMESTAMP BETWEEN pr.startDate AND pr.endDate " +
        "AND pr.product.id NOT IN " +
        "(SELECT p.id FROM Product p JOIN p.prices pr JOIN pr.discountPrices dp " +
        "WHERE CURRENT_TIMESTAMP BETWEEN dp.discount.startDate AND dp.discount.endDate)")
     List<Price> findByPriceByProductNameAndBrandName(String nameAndBrand);


    @Query("SELECT pr FROM Price pr " +
       "WHERE pr.product.status = 1 " +
       "AND CURRENT_TIMESTAMP BETWEEN pr.startDate AND pr.endDate " +
       "AND pr.product.id IN " +
       "(SELECT p.id FROM Product p JOIN p.prices pr JOIN pr.discountPrices dp " +
       "WHERE dp.discount.id = ?1 AND CURRENT_TIMESTAMP BETWEEN dp.discount.startDate AND dp.discount.endDate)")
        List<Price> findByPriceByProductInDiscount(String name);
     



    Optional<Price> findById(Long id);

}
