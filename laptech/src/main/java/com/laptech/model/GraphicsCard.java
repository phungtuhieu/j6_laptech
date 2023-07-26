package com.laptech.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    @JsonIgnore
    @OneToMany(mappedBy = "graphicsCard")
    List<Product> products;

}
