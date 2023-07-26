package com.laptech.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Setter
@Getter
public class DiscountPricePK {  
    @Column(name = "discount_id",insertable = false,updatable = false)
    private String discountId;

    @Column(name = "price_id",insertable = false,updatable = false)
    private Double priceId;

}
