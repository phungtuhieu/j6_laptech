package com.laptech.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laptech.model.Brand;

public interface BrandDAO extends JpaRepository<Brand,Long> {
    
}
