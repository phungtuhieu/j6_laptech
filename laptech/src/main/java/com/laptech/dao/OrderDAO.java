package com.laptech.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.laptech.model.Order;

public interface OrderDAO extends JpaRepository<Order,Long> {
    Page<Order> findByStatusLike(Integer status,Pageable pageable);
}
