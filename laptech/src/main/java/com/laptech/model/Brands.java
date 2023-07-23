package com.laptech.model;

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
//     logo  NVARCHAR(100) NOT NULL,
//     email NVARCHAR(100) NOT NULL,
//     phone NVARCHAR(15)  NOT NULL,
//     website NVARCHAR(200) NOT NULL,
//     country NVARCHAR(5) NOT NULL,
//     [description] NVARCHAR(200) 
@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "Brands")
public class Brands {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String name;
    String logo;
    String email;
    String phone;
    String website;
    String country;
    String description;
    
}
