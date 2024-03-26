package com.app.dto;

import javax.persistence.Column;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/*
 * Add in the resp DTO : id , name location
 */
@Getter
@Setter
@ToString
public class DepartmentDTO {
	
	//@JsonProperty-->to customize json properties
	//value: json property name
	//access:this property will be used during serialization but skipped during de-serialization
	@JsonProperty(value="category_id",access = Access.WRITE_ONLY)
	private Long id;
	private String name;
	private String location;

}
