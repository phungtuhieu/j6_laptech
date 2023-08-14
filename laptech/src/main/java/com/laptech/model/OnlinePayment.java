package com.laptech.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@Table(name = "Online_Payments")
public class OnlinePayment {

    @Id
    @Column(name = "transaction_id")
    String transactionId;
    
    @Column(name = "tmn_code")
    String tmnCode;

    Double amount;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "pay_date")
	Date payDate;

    @Column(name = "bank_code")
    String bankCode;

	@Column(name = "order_info")
    String orderInfo;

    @Column(name = "bank_tran_no")
    String bankTranNo;

    @Column(name = "txn_ref")
    String txnRef;

    @Column(name = "secure_hash_type")
    String secureHashType;

    @Column(name = "secure_hash")
    String secureHash;

    @Column(name = "transaction_status")
    String transactionStatus;

    @ManyToOne
    @JoinColumn(name = "order_id")
    Order order;
}
