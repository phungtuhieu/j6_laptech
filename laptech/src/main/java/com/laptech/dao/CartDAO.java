package com.laptech.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laptech.model.Account;
import com.laptech.model.Cart;

public interface CartDAO extends JpaRepository<Cart,Long>{
    List<Cart> findByUser(Account account);
}
