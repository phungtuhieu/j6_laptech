package com.laptech.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "Products")
public class Products {
    //    id BIGINT IDENTITY(1000,1) NOT NULL,
//     [name] NVARCHAR(200) NOT NULL,
//     create_date DATE NOT NULL,
//     quantity INT NOT NULL,
//     [description] NVARCHAR(MAX),
//     [status] INT NOT NULL,
//     ram_id BIGINT NOT NULL,
//     cpu_id BIGINT  NOT NULL,
//     storage_id BIGINT NOT NULL,
//     screen_size_id BIGINT NOT NULL,
//     graphics_card_id BIGINT NOT NULL,
//     operating_system_id BIGINT NOT NULL,
//     category_id BIGINT NOT NULL,
//     brand_id BIGINT NOT NULL
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String name;
    @Temporal(TemporalType.DATE)
    @Column(name = "create_date")
    Date createDate = new Date();
    Integer quantity;
    String description;
    Boolean status;
}
