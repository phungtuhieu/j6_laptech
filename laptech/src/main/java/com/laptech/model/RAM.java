package com.laptech.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

    // id BIGINT IDENTITY(1,1) NOT NULL,
    // [name] NVARCHAR(100) NOT NULL,
    // capacity INT NOT NULL,
    // [type] NVARCHAR(10) NOT NULL,
    // manufacturer NVARCHAR(200) NOT NULL
@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "RAM")
public class RAM {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String name;
    Integer capacity;
    String type;
    String manufacturer;

}
