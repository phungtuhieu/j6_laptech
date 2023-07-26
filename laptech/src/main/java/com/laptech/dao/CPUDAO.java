package com.laptech.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laptech.model.CPU;

public interface CPUDAO extends JpaRepository<CPU,Long> {
    
}
