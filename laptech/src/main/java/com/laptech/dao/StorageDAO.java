package com.laptech.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laptech.model.Storage;

public interface StorageDAO extends JpaRepository<Storage,Long>{
    
}
