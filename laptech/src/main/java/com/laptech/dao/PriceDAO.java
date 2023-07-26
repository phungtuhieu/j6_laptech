package com.laptech.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laptech.model.Price;

public interface PriceDAO extends JpaRepository<Price,Long> {
    
}
