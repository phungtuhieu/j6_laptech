package com.laptech.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Setter
@Getter
public class DiscountPricePK implements  Serializable {  
    @Column(name = "discount_id",insertable = false,updatable = false)
    private String discountId;

    @Column(name = "price_id",insertable = false,updatable = false)
    private Double priceId;

}
