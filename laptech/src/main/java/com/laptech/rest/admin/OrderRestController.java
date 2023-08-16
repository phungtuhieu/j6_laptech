package com.laptech.rest.admin;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.laptech.dao.CartDAO;
import com.laptech.dao.OrderDAO;
import com.laptech.dao.OrderDetailDAO;
import com.laptech.dao.ProductDAO;
import com.laptech.dao.UserDAO;
import com.laptech.model.Account;
import com.laptech.model.Order;
import com.laptech.model.OrderDetail;
import com.laptech.model.OrderStatus;
import com.laptech.model.Product;



@RestController
@RequestMapping("/api/order")
public class OrderRestController {
    
    @Autowired
    OrderDAO dao;
    
    @Autowired
    OrderDetailDAO daoOrderDel;
    
    @Autowired
    CartDAO daoCart;
    
    
    @Autowired
    ProductDAO daoProd;
    
    @Autowired
    UserDAO daoUser;
    
    @GetMapping("{status}")
    public ResponseEntity<Page<Order>> getList(@PathVariable("status") String status, @RequestParam("pageNo") Optional<Integer> pageNo){
        Integer statusOrder = 0;
        Sort sort;
        switch (status) {
            case "pending":
                statusOrder = OrderStatus.PENDING;
                sort = Sort.by(Sort.Order.desc("orderDate"));
                break;
            case "shipping":
                statusOrder = OrderStatus.SHIPPING;
                sort = Sort.by(Sort.Order.desc("deliveryDate"));
                break;
            case "completion":
                statusOrder = OrderStatus.COMPLETION;
                 sort = Sort.by(Sort.Order.desc("completionDate"));
                break;
            case "canceled":
                statusOrder = OrderStatus.CANCELED;
                sort = Sort.by(Sort.Order.desc("cancellationDate"));
                break;
            default:
            return ResponseEntity.badRequest().build();
        }
        Pageable pageable = PageRequest.of(pageNo.orElse(0), 5,sort);
        Page<Order> page = dao.findByStatusLike(statusOrder,pageable);
        return ResponseEntity.ok(page); 
    }

    @GetMapping("{status}/{orderId}")
    public ResponseEntity<Order> getOne(@PathVariable("orderId") Long orderId){
        if(!dao.existsById(orderId)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dao.findById(orderId).get()); 
    }

    @GetMapping("{status}/orders-user/{username}")
    public ResponseEntity<Page<Order>> getOrderByUserAndStatus(
        @PathVariable("status") String status,
        @PathVariable("username") String username,
        @RequestParam("pageNo") Optional<Integer> pageNo){
        Integer statusOrder = 0;
        Sort sort;
        switch (status) {
            case "pending":
                statusOrder = OrderStatus.PENDING;
                sort = Sort.by(Sort.Order.desc("orderDate"));
                break;
            case "shipping":
                statusOrder = OrderStatus.SHIPPING;
                sort = Sort.by(Sort.Order.desc("deliveryDate"));
                break;
            case "completion":
                statusOrder = OrderStatus.COMPLETION;
                 sort = Sort.by(Sort.Order.desc("completionDate"));
                break;
            case "canceled":
                statusOrder = OrderStatus.CANCELED;
                sort = Sort.by(Sort.Order.desc("cancellationDate"));
                break;
            default:
            return ResponseEntity.badRequest().build();
        }
        if(!daoUser.existsById(username)) {
            return ResponseEntity.notFound().build();
        }
        Account user = daoUser.findById(username).get();
        Pageable pageable = PageRequest.of(pageNo.orElse(0), 5,sort);
        Page<Order> page = dao.findByStatusAndUser(statusOrder, user,pageable);
        return ResponseEntity.ok(page); 
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

    @PostMapping
    public ResponseEntity<Order> create(@RequestBody JsonNode orderData){
        ObjectMapper mapper = new ObjectMapper();

        Order order =  mapper.convertValue(orderData, Order.class);

       Order orderSaved = dao.save(order);

        TypeReference<List<OrderDetail>> type =  new TypeReference<List<OrderDetail>>() {};
        List<OrderDetail> details  = mapper.convertValue(orderData.get("orderDetails"),type)
        .stream().peek(d -> d.setOrder(order)).collect(Collectors.toList());

        
        List<OrderDetail> listOrderD =  daoOrderDel.saveAll(details);
        for (OrderDetail orderDetail : listOrderD) {
             Product prod = daoProd.findById(orderDetail.getProduct().getId()).get();
             System.out.println(prod.getQuantity());
             System.out.println(orderDetail.getQuantity());
             System.out.println(prod.getQuantity() - orderDetail.getQuantity());
             prod.setQuantity(prod.getQuantity() - orderDetail.getQuantity());
             daoProd.save(prod);
        }
        return ResponseEntity.ok(orderSaved); 
    }

    @PutMapping("{status}/{orderId}")
    public ResponseEntity<Order> update(@PathVariable("orderId") Long orderId,@RequestBody Order order){
        if(!dao.existsById(orderId)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok( dao.save(order)); 
    }
    @PutMapping("/cancel/orders-user/{orderId}")
    public ResponseEntity<Order> cancelOrder(@PathVariable("orderId") Long orderId,@RequestBody Order order){
        if(!dao.existsById(orderId)) {
            return ResponseEntity.notFound().build();
        }
        Order ord = dao.findById(orderId).get();
        List<OrderDetail> listOrderD =  ord.getOrderDetails();
        for (OrderDetail orderDetail : listOrderD) {
             Product prod = daoProd.findById(orderDetail.getProduct().getId()).get();
             System.out.println(prod.getQuantity());
             System.out.println(orderDetail.getQuantity());
             System.out.println(prod.getQuantity() + orderDetail.getQuantity());
             prod.setQuantity(prod.getQuantity() + orderDetail.getQuantity());
             daoProd.save(prod);
        }
        return ResponseEntity.ok( dao.save(order)); 
    }
}
