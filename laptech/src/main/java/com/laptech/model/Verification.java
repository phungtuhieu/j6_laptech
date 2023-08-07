package com.laptech.model;


import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
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
    Account user;
}
