package com.laptech.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import com.laptech.model.GraphicsCard;

public interface GraphicsCardDAO extends JpaRepository<GraphicsCard,Long> {

    @Query("SELECT c FROM GraphicsCard c WHERE c.name LIKE CONCAT('%', :name, '%') ")
    List<GraphicsCard> findByNameLike(@Param("name") String name);


}
