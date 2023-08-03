package com.laptech.model;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
@Table(name = "Discount")
public class Discount {
    
    @Id 
    String id;
    String title;
    Integer percentage;
    @Temporal(TemporalType.DATE)
    @Column(name = "start_date")
    Date startDate = new Date();
    @Temporal(TemporalType.DATE)
    @Column(name = "end_date")
    Date endDate = new Date();

    Boolean active;
    String description;
   
    @JsonIgnore
    @OneToMany(mappedBy = "discount")
    List<DiscountPrice> discountPrices;
}

