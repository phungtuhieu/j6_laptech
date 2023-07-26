package com.laptech.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laptech.model.OrderDetail;

public interface OrderDetailDAO extends JpaRepository<OrderDetail,Long>{
    
}
