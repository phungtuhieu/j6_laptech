package com.laptech.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "Screen_Size")
public class ScreenSize {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    Double size;
    String resolution ;
    @Column(name = "panel_type" )
    String panelType ;
    @Column(name = "touch_screen" )
    Boolean touchScreen;
    @JsonIgnore
    @OneToMany(mappedBy = "screenSize")
    List<Product> products;
}
