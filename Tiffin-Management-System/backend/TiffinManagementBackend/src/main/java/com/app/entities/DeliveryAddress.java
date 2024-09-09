package com.app.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "delivery_address")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "userAddresses")
public class DeliveryAddress {
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	@Column(name = "location_id")
	private int locationId;
	
	@Column(name = "delivery_area")
	private String deliveryArea;
	
	@Column
	private String city;
	
	@Column(name = "pin_code")
	private int pinCode;
	
	@OneToMany(mappedBy = "deliveryAddress")
	List<UserAddress> userAddresses;
}
