package com.laptech.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.laptech.model.User;

public interface UserDAO extends JpaRepository<User, String> {
    @Query("SELECT u FROM User u WHERE u.fullname LIKE CONCAT('%', :keyword, '%') OR u.username LIKE CONCAT('%', :keyword, '%')")
    List<User> findByFullnameOrUsernameLike(@Param("keyword") String keyword);

}
