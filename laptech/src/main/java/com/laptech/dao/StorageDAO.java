package com.laptech.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.laptech.model.Storage;

public interface StorageDAO extends JpaRepository<Storage, Long> {
    @Query("SELECT s FROM Storage s WHERE s.type LIKE CONCAT('%', :keyword, '%') OR s.capacity LIKE CONCAT('%', :keyword, '%')")
    List<Storage> findByKeywordInTypeOrCapacity(@Param("keyword") String keyword);

}
