package com.app.entities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = { "orderList", "daywiseOrder", "userAddress" })
public class User {
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	@Column(name = "user_id")
	private int userId;

	@Column(name = "user_name")
	private String userName;
	
	@Column(unique = true,nullable = false)
	private String email;

	private String password;

	private String phone;

	private String role;

	@Column(name = "aadhar_no")
	private String aadharNo;

	@OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
	private List<Order> orderList;

	@OneToMany(mappedBy = "deliveryBoy")
	private List<DaywiseOrder> daywiseOrder;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "userId")
	private UserAddress userAddress;

	public User(int id) {
		this.userId = id;
	}

}
