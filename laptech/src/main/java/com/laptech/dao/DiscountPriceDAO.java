package com.laptech.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.laptech.model.Brand;
import com.laptech.model.DiscountPrice;
import com.laptech.model.DiscountPricePK;
import com.laptech.model.Price;

public interface DiscountPriceDAO extends JpaRepository<DiscountPrice, DiscountPricePK> {

    @Query("SELECT dp FROM DiscountPrice dp "
    + "WHERE dp.discount.id = dp.discount.id "
    + "AND dp.discount.active = true "
    + "AND CURRENT_TIMESTAMP BETWEEN dp.discount.startDate AND dp.discount.endDate "
    + "AND dp.price.id = dp.price.id")
    List<DiscountPrice> findByDiscountAndPriceId();

    @Query("SELECT dp FROM DiscountPrice dp WHERE dp.price = ?1 AND CURRENT_TIMESTAMP "
    + "BETWEEN dp.discount.startDate AND dp.discount.endDate")
    DiscountPrice findByDiscountAndPriceByNowDate(Price price);


    @Query("SELECT dp FROM DiscountPrice dp WHERE dp.discount.id = ?1 ")
    List<DiscountPrice> findByDiscountIdAll(String name);


    @Query("SELECT dp FROM DiscountPrice dp WHERE dp.discount.id = ?1 AND dp.price.id = ?2 ")
    DiscountPrice findByOne(String discountId, Long priceId);
    
    
}
