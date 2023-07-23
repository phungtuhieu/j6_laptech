package com.laptech.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
//  id BIGINT IDENTITY(1,1) NOT NULL,
//     [name] NVARCHAR(100) NOT NULL,
//     cores INT NOT NULL,
//     memory_size INT NOT NULL,
//     base_clock INT NOT NULL,
//     boost_clock INT NOT NULL,
//     manufacturer NVARCHAR(200) NOT NULL
@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "Graphics_Card")
public class GraphicsCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String name;
    Integer cores;
    @Column( name = "memory_size")
    Integer memorySize;
    @Column(name = "base_clock")
    Integer baseClock;
    @Column(name = "boost_clock")
    Integer boostClock;
    String manufacturer;
}
