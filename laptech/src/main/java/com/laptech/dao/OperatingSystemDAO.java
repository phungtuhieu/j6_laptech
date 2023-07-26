package com.laptech.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laptech.model.OperatingSystem;

public interface OperatingSystemDAO extends JpaRepository<OperatingSystem,Long>{
    
}
