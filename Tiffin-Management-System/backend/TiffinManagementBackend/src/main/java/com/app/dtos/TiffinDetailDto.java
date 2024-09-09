package com.app.dtos;

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
public class TiffinDetailDto {

	private int tiffinId;
	private String tiffinName;
	private String tiffinImage;
	private int tiffinPrice;
	private String description;

}
