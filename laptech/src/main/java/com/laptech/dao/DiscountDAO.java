package com.laptech.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laptech.model.Discount;

public interface DiscountDAO extends JpaRepository<Discount,Long> {
    
}
