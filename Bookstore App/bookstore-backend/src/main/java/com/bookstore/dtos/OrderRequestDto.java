package com.bookstore.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderRequestDto {
    private String bookTitle;
    private double price;
}

