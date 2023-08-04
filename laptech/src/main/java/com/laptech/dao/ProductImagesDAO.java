package com.laptech.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.laptech.model.ProductImages;

public interface ProductImagesDAO extends JpaRepository<ProductImages,Long> {
    

    @Query("SELECT ima FROM ProductImages ima WHERE ima.product.id = ?1")
    List<ProductImages> findByProduct(Long id);


    
}
