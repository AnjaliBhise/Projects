package com.app.dtos;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class PaymentDto {

	private int transactionId;
	private int orderId;
	private String paymentType;
	private int totalPayment;
	private String paymentStatus;
	private Date paymentTime;

}
