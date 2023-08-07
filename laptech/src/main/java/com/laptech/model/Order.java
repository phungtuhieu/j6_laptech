package com.laptech.model;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
@Table(name = "Orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "order_date")
    Date orderDate = new Date();

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "completion_date")
    Date completionDate = new Date();

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "delivery_date")
    Date deliveryDate = new Date();

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "cancellation_date")
    Date cancellationDate = new Date();

    String cancellationReason;

    Boolean paymentMethod;

    Integer  status;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    Account user;

    @JsonIgnore
    @OneToMany(mappedBy = "order")
    List<OrderDetail> orderDetails;
}
