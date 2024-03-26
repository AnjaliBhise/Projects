package com.app.entities;

import java.time.LocalDate;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name="products")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class Product extends BaseEntity {
	@Column(length = 20)
	private String name;
	
	@Column(length = 40)
	private String description;
	
	private Double price;
	
	@Column(name="available_stock")
	private int availableStock;
	
	@Column(name="expiry_date")
	private LocalDate expiryDate;

	@ManyToOne
	@JoinColumn(name ="category_id")
	private Category category; 
	
}
