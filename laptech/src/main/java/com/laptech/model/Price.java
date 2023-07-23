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
// id BIGINT IDENTITY(1,1) NOT NULL,
// price FLOAT NOT NULL,
// product_id BIGINT NOT NULL,
// [start_date] DATE NOT NULL,
// [end_date] DATE NOT NULL
@Entity
@Table(name = "Price")
public class Price {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    Double price;
    @Temporal(TemporalType.DATE)
    @Column(name = "start_date")
    Date startDate = new Date();
    @Temporal(TemporalType.DATE)
    @Column(name = "end_date")
    Date enDate = new Date();
    
}
