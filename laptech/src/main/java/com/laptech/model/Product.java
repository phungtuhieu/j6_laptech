package com.laptech.model;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
public class Product {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String name;
    @Temporal(TemporalType.DATE)
    @Column(name = "create_date")
    Date createDate = new Date();
    Integer quantity;
    String description;
    Integer status;

    @JoinColumn(name = "ram_id")
    @ManyToOne
    RAM ram;

    @JoinColumn(name = "cpu_id")
    @ManyToOne
    CPU cpu;

    @JoinColumn(name = "storage_id")
    @ManyToOne
    Storage storage;

    @JoinColumn(name = "screen_size_id")
    @ManyToOne
    ScreenSize screenSize;

    @JoinColumn(name = "graphics_card_id")
    @ManyToOne
    GraphicsCard graphicsCard;

    @JoinColumn(name = "operating_system_id")
    @ManyToOne
    OperatingSystem operatingSystem;

    @JoinColumn(name = "category_id")
    @ManyToOne
    Category category;

    @JoinColumn(name = "brand_id")
    @ManyToOne
    Brand brand ;
    
    @JsonIgnore
    @OneToMany(mappedBy =  "product")
    List<Price> prices;
    
    @JsonIgnore
    @OneToMany(mappedBy =  "product")
    List<Favorite> favorites;

    @JsonIgnore
    @OneToMany(mappedBy =  "product")
    List<ProductImages> productImages;


   
    
}
