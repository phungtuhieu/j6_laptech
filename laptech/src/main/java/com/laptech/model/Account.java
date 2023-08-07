package com.laptech.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "Users")
public class Account {

    @Id
    String username ;
    String password;
    String fullname;
    String phone;
    String email;
    String address;
    Boolean admin;
    Boolean active;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    List<Order> orders;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    List<Verification> verifications;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    List<Favorite> favorites;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    List<Avartar> avartars;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    List<Cart> carts;
}
