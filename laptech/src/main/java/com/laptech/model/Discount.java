package com.laptech.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
// id NVARCHAR(20) NOT NULL,
//     title NVARCHAR(200) NOT NULL,
//     [percentage] INT NOT NULL,
//     [start_date] DATE NOT NULL,
//     [end_date] DATE NOT NULL,
//     active BIT NOT NULL,
//     [description] NVARCHAR(200) 
@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "Discount")
public class Discount {
    @Id
    String id;
    String title;
    Integer percentage;
    @Column(name = "start_date")
    Date startDate = new Date();
    @Temporal(TemporalType.DATE)
    @Column(name = "end_date")
    Date enDate = new Date();

    Boolean active;
    String description;
}

