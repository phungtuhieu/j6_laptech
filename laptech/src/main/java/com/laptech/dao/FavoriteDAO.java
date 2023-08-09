package com.laptech.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.laptech.model.Account;
import com.laptech.model.Favorite;

public interface FavoriteDAO extends JpaRepository<Favorite,Long> {

     @Query("SELECT f FROM Favorite f JOIN f.product.prices pr WHERE f.product.status = 1 AND CURRENT_TIMESTAMP BETWEEN pr.startDate AND pr.endDate  AND f.user.username = :name ")
    List<Favorite> findByFavoriteLikeUser(@Param("name") String name);
    
}
