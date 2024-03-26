package com.app.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.validation.constraints.Future;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class RespProductDto {
	// add validation rules here : since this DTO representation will be sent by
	// rest clnt
	
	@NotNull
	private Long productId;
	
	@NotBlank
	private String name;	
	private String description;
	
	@Max(500)
	private double price;
	private int availableStock;
	
	@Future
	private LocalDate expiryDate;

}
