package com.laptech.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laptech.model.Category;

public interface CategoryDAO extends JpaRepository<Category,Long> {

    List<Category> findByNameLike(String name);
    
}
