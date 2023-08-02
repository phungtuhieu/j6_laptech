package com.laptech.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.laptech.model.CPU;
import com.laptech.model.User;

public interface CPUDAO extends JpaRepository<CPU, Long> {

    @Query("SELECT c FROM CPU c WHERE c.name LIKE CONCAT('%', :keyword, '%') OR c.socket LIKE CONCAT('%', :keyword, '%')")
    List<CPU> findByKeywordInNameOrSocket(@Param("keyword") String keyword);

}
