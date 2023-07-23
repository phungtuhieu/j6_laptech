package com.laptech.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//   id BIGINT IDENTITY(1,1) NOT NULL,
//     user_id NVARCHAR(50) NOT NULL,
//     [image] NVARCHAR(100) NOT NULL,
//     is_selected BIT
@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "Avartars")
public class Avartar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String image;
    Boolean selected;
}
