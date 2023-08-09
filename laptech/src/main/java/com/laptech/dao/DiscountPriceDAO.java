package com.laptech.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.laptech.model.Brand;
import com.laptech.model.DiscountPrice;
import com.laptech.model.DiscountPricePK;

public interface DiscountPriceDAO extends JpaRepository<DiscountPrice, DiscountPricePK> {

    @Query("SELECT dp FROM DiscountPrice dp "
    + "WHERE dp.discount.id = dp.discount.id "
    + "AND dp.discount.active = true "
    + "AND CURRENT_TIMESTAMP BETWEEN dp.discount.startDate AND dp.discount.endDate "
    + "AND dp.price.id = dp.price.id")
    List<DiscountPrice> findByDiscountAndPriceId();


    
}
