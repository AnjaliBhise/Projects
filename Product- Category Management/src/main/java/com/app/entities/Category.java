package com.app.entities;

import java.time.LocalDate;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="category")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
//@ToString(callSuper = true)
public class Category extends BaseEntity 
{
	@Column(length=20)
	private String name;
	
	@Column(length=30)
	private String description;

	@Override
	public String toString() {
		return "Category [name=" + getId() + ", description=" + description + "]";
	}

	
}
