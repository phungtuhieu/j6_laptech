package com.laptech.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.laptech.model.Category;

public interface CategoryDAO extends JpaRepository<Category, Long> {

    @Query("SELECT c FROM Category c WHERE c.name LIKE CONCAT('%', :name, '%') ")
    List<Category> findByNameLike(@Param("name") String name);



   


    
    // @Query("SELECT c FROM Category c WHERE c.id LIKE CONCAT('%', :idName, '%') OR
    // c.categoryName LIKE CONCAT('%', :idName, '%')")
    // Page<Category> findByIdOrCategoryName(@Param("idName") String idName,
    // Pageable pageable);

}
