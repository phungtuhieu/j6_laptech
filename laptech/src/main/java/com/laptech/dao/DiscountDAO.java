package com.laptech.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.laptech.model.Discount;
import com.laptech.model.DiscountPrice;

public interface DiscountDAO extends JpaRepository<Discount,String> {


    @Query("SELECT d FROM Discount d WHERE d.id LIKE CONCAT('%', :id, '%') OR d.title LIKE CONCAT('%', :id, '%') ")
    List<Discount> findByNameLike(@Param("id") String id);



    @Query("SELECT d FROM Discount d WHERE CURRENT_TIMESTAMP BETWEEN d.startDate AND d.endDate ")
    List<Discount> findByBetweenDate();


    @Query("SELECT d FROM Discount d WHERE CURRENT_TIMESTAMP NOT BETWEEN d.startDate AND d.endDate ")
    List<Discount> findByNotBetweenDate();
}
