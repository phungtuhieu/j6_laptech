package com.laptech.model;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
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
@Table(name = "Price")
public class Price {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    Double price;
    @Temporal(TemporalType.DATE)
    @Column(name = "start_date")
    Date startDate = new Date();
    @Temporal(TemporalType.DATE)
    @Column(name = "end_date")
    Date enDate = new Date();
    
    @ManyToOne
    @JoinColumn(name = "product_id")
    Product product;


    
    @JsonIgnore
    @OneToMany(mappedBy = "price", cascade = CascadeType.ALL)
    private List<DiscountPrice> discountPrices;
}

