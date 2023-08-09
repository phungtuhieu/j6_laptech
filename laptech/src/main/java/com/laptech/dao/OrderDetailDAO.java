package com.laptech.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.laptech.model.Order;
import com.laptech.model.OrderDetail;

public interface OrderDetailDAO extends JpaRepository<OrderDetail,Long>{
    Page<OrderDetail> findByOrder(Order order, Pageable pageable);
}
