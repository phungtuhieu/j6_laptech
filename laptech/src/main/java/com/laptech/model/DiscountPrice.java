package com.laptech.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "Discount_Price")
public class DiscountPrice {
    @EmbeddedId
    DiscountPricePK discountPricePK;

    @ManyToOne
    @JoinColumn(name = "discount_id", insertable = false,updatable = false)
    Discount discount;
    
    @ManyToOne
    @JoinColumn(name = "price_id", insertable = false,updatable = false)
    Price price;
    
  
}
