package com.laptech.model;


import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
//   id BIGINT IDENTITY(1,1) NOT NULL,
//     user_id NVARCHAR(50) NOT NULL,
//     code NVARCHAR(8) NOT NULL,
//     create_at DATETIME NOT NULL,
//     expiration_at DATETIME NOT NULL,
//     [status] BIT NOT NULL
@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "Verification")
public class Verification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String code;
    @Temporal(TemporalType.TIMESTAMP)
    @Column( name = "create_at")
    Date createAt = new Date();
    @Temporal(TemporalType.TIMESTAMP)
    @Column( name = "expiration_at")
    Date expirationAt = new Date();
    Boolean status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;
}
