package com.laptech.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.laptech.model.Account;
import com.laptech.model.Favorite;

public interface FavoriteDAO extends JpaRepository<Favorite,Long> {

     @Query("SELECT f FROM Favorite f WHERE f.user.username = :name ")
    List<Favorite> findByFavoriteLikeUser(@Param("name") String name);
    
}
