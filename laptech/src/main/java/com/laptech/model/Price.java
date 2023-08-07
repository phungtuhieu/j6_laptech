package com.laptech.model;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
    Date endDate = new Date();
    
    @ManyToOne
    @JoinColumn(name = "product_id")
    Product product;


    
    @JsonIgnore
    @OneToMany(mappedBy = "price", cascade = CascadeType.ALL)
    private List<DiscountPrice> discountPrices;
}

