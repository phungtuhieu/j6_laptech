package com.laptech.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laptech.model.GraphicsCard;

public interface GraphicsCardDAO extends JpaRepository<GraphicsCard,Long> {
    
}
