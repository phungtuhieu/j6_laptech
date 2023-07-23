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
//     threads INT NOT NULL,
//     socket NVARCHAR(50) NOT NULL,
//     clock_speed FLOAT NOT NULL,
//     turbo_speed FLOAT NOT NULL,
//     cache INT NOT NULL,
//     manufacturer NVARCHAR(200) NOT NULL
@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "CPU")
public class CPU {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String name;
    Integer cores;
    Integer threads;
    String socket;
    @Column(name = "clock_speed")
    Double clockSpeed;
    @Column(name = "turbo_speed")
    Double turboSpeed;
    Integer cache;
    String manufacturer;
}
