package com.laptech.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laptech.model.Product;

public interface ProductDAO extends JpaRepository<Product,Long>{
    
}
