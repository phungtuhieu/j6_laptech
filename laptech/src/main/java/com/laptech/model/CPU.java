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

    @JsonIgnore
    @OneToMany(mappedBy = "cpu")
    List<Product> products;
}
