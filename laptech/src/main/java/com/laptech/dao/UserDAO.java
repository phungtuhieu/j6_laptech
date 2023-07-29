package com.laptech.dao;



import org.springframework.data.jpa.repository.JpaRepository;

import com.laptech.model.User;

public interface UserDAO extends JpaRepository<User,String> {
    
}
