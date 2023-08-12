package com.laptech.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.laptech.model.Product;
import com.laptech.model.ProductImages;

public interface ProductImagesDAO extends JpaRepository<ProductImages,Long> {
    List<ProductImages> findByProduct(Product product);
    

    @Query("SELECT ima FROM ProductImages ima WHERE ima.product.id = ?1")
    List<ProductImages> findByProductId(Long id);

    @Query("SELECT ima FROM ProductImages ima WHERE ima.product.id = ?1 AND ima.main = ?2")
    ProductImages findByProductIdAndMain( Long id, Boolean isMain);

    
}
