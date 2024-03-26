package com.app.dto;

import javax.persistence.Column;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
public class CategoryDto
{
	//@JsonProperty-->to customize json properties
	//value: json property name
	//access:this property will be used during serialization but skipped during de-serialization
	@JsonProperty(value="dept_id",access = Access.READ_ONLY)
	private Long id;

	private String name;

	private String description;
	

}