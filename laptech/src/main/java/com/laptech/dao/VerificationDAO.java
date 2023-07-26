package com.laptech.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laptech.model.Verification;

public interface VerificationDAO extends JpaRepository<Verification,String>{
    
}
