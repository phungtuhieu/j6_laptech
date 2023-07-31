package com.laptech.model;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportProductSold implements Serializable {
    @Id
    String name;
    Date saleDate;
    Long  quantity;
    Double totalPrice;
    
}
