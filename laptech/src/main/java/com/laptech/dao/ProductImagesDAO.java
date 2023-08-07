package com.laptech.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laptech.model.Product;
import com.laptech.model.ProductImages;

public interface ProductImagesDAO extends JpaRepository<ProductImages,Long> {
    List<ProductImages> findByProduct(Product product);
}
