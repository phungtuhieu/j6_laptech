package com.laptech.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
@Table(name = "Screen_Size")
public class ScreenSize {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    Double size;

    @JsonIgnore
    @OneToMany(mappedBy = "screenSize")
    List<Product> products;
}