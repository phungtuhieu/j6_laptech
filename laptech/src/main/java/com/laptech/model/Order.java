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
// id BIGINT IDENTITY(10000,1) NOT NULL,
// user_id NVARCHAR(50) NOT NULL,
// order_date DATETIME NOT NULL,
// completion_date DATETIME ,
// delivery_date DATETIME ,
// cancellation_date DATETIME ,
// cancellation_reason NVARCHAR(200),
// payment_method BIT NOT NULL,
// [status] INT NOT NULL
@Entity
@Table(name = "Orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "order_date")
    Date orderDate = new Date();
    

}
