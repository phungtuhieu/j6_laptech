package com.laptech.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.laptech.model.Brand;
import com.laptech.model.Price;
import com.laptech.model.Product;



public interface PriceDAO extends JpaRepository<Price,Long> {


    @Query("SELECT pr FROM Price pr WHERE pr.product.status = 1 AND CURRENT_TIMESTAMP BETWEEN pr.startDate AND pr.endDate")
    List<Price> findByPriceInDate();


    @Query("SELECT p FROM Price p WHERE p.id NOT IN " +
        "(SELECT dp.price.id  FROM DiscountPrice dp "
        + "WHERE dp.discount.id = dp.discount.id "
        + "AND dp.discount.active = true "
        + "AND CURRENT_TIMESTAMP BETWEEN dp.discount.startDate AND dp.discount.endDate "
        + "AND dp.price.id = dp.price.id)")
        
    List<Price> findPricesWithoutDiscountPrices();


}
