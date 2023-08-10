package com.laptech.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.laptech.model.ScreenSize;

public interface ScreenSizeDAO extends JpaRepository<ScreenSize, Long> {
    @Query("SELECT ss FROM ScreenSize ss WHERE ss.size LIKE CONCAT('%', :size, '%') AND ss.panelType LIKE CONCAT('%', :panelType, '%')")
    List<ScreenSize> findBySizeAndPanelType(@Param("size") String size, @Param("panelType") String panelType);
}
