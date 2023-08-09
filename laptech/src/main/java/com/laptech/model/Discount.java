package com.laptech.model;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
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

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "start_date")
    Date startDate = new Date();

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "end_date")
    Date endDate = new Date();

    Boolean active;
    String description;
   
    @JsonIgnore
    @OneToMany(mappedBy = "discount")
    List<DiscountPrice> discountPrices;
}

