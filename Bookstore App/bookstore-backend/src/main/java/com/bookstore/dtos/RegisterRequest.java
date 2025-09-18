package com.bookstore.dtos;

import com.bookstore.entities.Role;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private String address;
}

