package com.laptech.rest.admin;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.laptech.dao.OrderDAO;
import com.laptech.dao.OrderDetailDAO;
import com.laptech.model.Order;
import com.laptech.model.OrderDetail;
import com.laptech.model.OrderStatus;

@RestController
@RequestMapping("/api/order")
public class OrderRestController {
    
    @Autowired
    OrderDAO dao;
    
    @Autowired
    OrderDetailDAO daoOrderDel;

    @GetMapping("{status}")
    public ResponseEntity<Page<Order>> getList(@PathVariable("status") String status, @RequestParam("pageNo") Optional<Integer> pageNo){
        Integer statusOrder = 0;
        switch (status) {
            case "pending":
                statusOrder = OrderStatus.PENDING;
                break;
            case "shipping":
                statusOrder = OrderStatus.SHIPPING;
                break;
            case "completion":
                statusOrder = OrderStatus.COMPLETION;
                break;
            case "canceled":
                statusOrder = OrderStatus.CANCELED;
                break;
            default:
            return ResponseEntity.badRequest().build();
        }
        Pageable pageable = PageRequest.of(pageNo.orElse(0), 5);
        Page<Order> page = dao.findByStatusLike(statusOrder, pageable);
        return ResponseEntity.ok(page); 
    }

    @GetMapping("{status}/{orderId}")
    public ResponseEntity<Order> getOne(@PathVariable("orderId") Long orderId){
        if(!dao.existsById(orderId)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dao.findById(orderId).get()); 
    }

    @GetMapping("{orderId}/order-details")
    public ResponseEntity<Page<OrderDetail>> getOrderDetails(@PathVariable("orderId") Long orderId,@RequestParam("pageNo") Optional<Integer> pageNo){
        if(!dao.existsById(orderId)) {
            return ResponseEntity.notFound().build();
        }
        Order order = dao.findById(orderId).get();
        Pageable pageable = PageRequest.of(pageNo.orElse(0),5);
        Page<OrderDetail> page = daoOrderDel.findByOrder(order, pageable);
        return ResponseEntity.ok(page); 
    }
    @PutMapping("{status}/{orderId}")
    public ResponseEntity<Order> update(@PathVariable("orderId") Long orderId,@RequestBody Order order){
        if(!dao.existsById(orderId)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok( dao.save(order)); 
    }
}
