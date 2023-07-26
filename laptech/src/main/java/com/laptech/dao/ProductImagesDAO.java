package com.laptech.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laptech.model.ProductImages;

public interface ProductImagesDAO extends JpaRepository<ProductImages,Long> {
    
}
