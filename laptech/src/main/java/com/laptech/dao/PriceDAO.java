package com.laptech.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laptech.model.Price;
import com.laptech.model.Product;

public interface PriceDAO extends JpaRepository<Price,Long> {
    List<Price> findByProduct(Product product);
}
