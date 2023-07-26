package com.laptech.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laptech.model.ScreenSize;

public interface ScreenSizeDAO extends JpaRepository<ScreenSize,Long> {
    
}
