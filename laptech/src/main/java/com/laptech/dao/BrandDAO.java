package com.laptech.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.laptech.model.Brand;
import com.laptech.model.Category;

public interface BrandDAO extends JpaRepository<Brand,Long> {

    @Query("SELECT b FROM Brand b WHERE b.name LIKE CONCAT('%', :name, '%') ")
    List<Brand> findByNameLike(@Param("name") String name);
}
