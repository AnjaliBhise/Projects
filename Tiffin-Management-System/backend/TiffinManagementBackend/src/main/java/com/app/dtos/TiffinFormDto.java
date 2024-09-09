package com.app.dtos;

import org.springframework.beans.BeanUtils;
import org.springframework.web.multipart.MultipartFile;

import com.app.entities.TiffinDetail;

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
public class TiffinFormDto {
	private int tiffinId;
	private String tiffinName;
	private int tiffinPrice;
	private MultipartFile tiffinImage;
	private String description;

	public static TiffinDetail toEntity(TiffinFormDto dto) {
		TiffinDetail entity = new TiffinDetail();
		BeanUtils.copyProperties(dto, entity, "imageName");
		return entity;
	}
}
