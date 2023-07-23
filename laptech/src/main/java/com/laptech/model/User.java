package com.laptech.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "Users")
public class User {
    //   username NVARCHAR(50) NOT NULL,
    // [password] NVARCHAR(50) NOT NULL,
    // fullname NVARCHAR(50) NOT NULL,
    // phone NVARCHAR(15),
    // email NVARCHAR(100) NOT NULL,
    // [address] NVARCHAR(200) NOT NULL,
    // [admin] BIT NOT NULL,   
    // active BIT NOT NULL
    @Id
    String username ;
    String password;
    String fullname;
    String phone;
    String email;
    String address;
    Boolean admin;
    Boolean active;

    
}
