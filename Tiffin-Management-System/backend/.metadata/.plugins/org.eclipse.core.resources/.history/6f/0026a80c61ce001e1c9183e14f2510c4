package com.app.entities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "tiffin_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "order")
public class TiffinDetail {
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	@Column(name = "tiffin_id")
	private int tiffinId;
	
	@Column(name = "tiffin_name")
	private String tiffinName;
	
	@Lob
	@Column(name = "tiffin_image")
	private String tiffinImage;
	
	@Column(name = "tiffin_price")
	private int tiffinPrice;
	
	@Column(name = "description")
	private String description;
	
	@OneToMany(mappedBy = "tiffinDetails", cascade = CascadeType.ALL)
	private List<Order> order;
	
	public TiffinDetail(int tiffinId) {
		this.tiffinId=tiffinId;
	}
}	
