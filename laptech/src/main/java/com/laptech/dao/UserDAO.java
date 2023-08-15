package com.laptech.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.laptech.model.Account;

public interface UserDAO extends JpaRepository<Account, String> {

    @Query("SELECT u FROM Account u WHERE u.fullname LIKE CONCAT('%', :keyword, '%') OR u.username LIKE CONCAT('%', :keyword, '%')")
    List<Account> findByFullnameOrUsernameLike(@Param("keyword") String keyword);

    // @Query("SELECT COUNT(u) > 0 FROM Account u WHERE u.email = :email") // kiểm
    // tra sự tồn tại của email
    // boolean existsByEmail(@Param("email") String email);
    Account findByEmail(String email);

    // @Query("SELECT COUNT(u) > 0 FROM Account u WHERE u.username = :username") //
    // kiểm tra sự tồn tại của username
    // boolean existsByUsername(@Param("username") String username);
}
