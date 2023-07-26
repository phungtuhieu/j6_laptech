package com.laptech.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laptech.model.Cart;

public interface CartDAO extends JpaRepository<Cart,Long>{
    
}
