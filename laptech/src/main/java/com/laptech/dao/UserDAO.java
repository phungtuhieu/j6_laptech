package com.laptech.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.laptech.model.Account;

public interface UserDAO extends JpaRepository<Account, String> {
    @Query("SELECT u FROM Account u WHERE u.fullname LIKE CONCAT('%', :keyword, '%') OR u.username LIKE CONCAT('%', :keyword, '%')")
    List<Account> findByFullnameOrUsernameLike(@Param("keyword") String keyword);

}
