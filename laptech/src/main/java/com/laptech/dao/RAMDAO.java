package com.laptech.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.laptech.model.RAM;

public interface RAMDAO extends JpaRepository<RAM,Long>{

    @Query("SELECT r FROM RAM r WHERE r.name LIKE CONCAT('%', :name, '%') ")
    List<RAM> findByNameLike(@Param("name") String name);

}
