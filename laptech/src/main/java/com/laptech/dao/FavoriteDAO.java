package com.laptech.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laptech.model.Favorite;

public interface FavoriteDAO extends JpaRepository<Favorite,Long> {
    
}
