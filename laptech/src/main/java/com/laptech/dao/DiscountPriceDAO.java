package com.laptech.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laptech.model.DiscountPrice;
import com.laptech.model.DiscountPricePK;

public interface DiscountPriceDAO extends JpaRepository<DiscountPrice,DiscountPricePK> {
    
}
