package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "user_address")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"user", "deliveryAddress"})
public class UserAddress {
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	@Column(name = "address_id")
	private int addressId;

	@Column(name = "user_id")
	private int userId;

	@Column(name = "address_line1")
	private String addressLine;

	@OneToOne(mappedBy = "userAddress",fetch = FetchType.LAZY)
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "location_id")
	private DeliveryAddress deliveryAddress;
}
