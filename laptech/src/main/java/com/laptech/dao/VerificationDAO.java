package com.laptech.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.laptech.model.Verification;

public interface VerificationDAO extends JpaRepository<Verification, String> {
    @Query("SELECT v FROM Verification v WHERE v.user.username = :username  ")
    Verification findVerificationByUser(@Param("username") String username);
}
