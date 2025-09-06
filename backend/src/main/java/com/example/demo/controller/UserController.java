package com.example.demo.controller;

import com.example.demo.dto.UserDto;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public UserDto getUser() {
        return userService.getUser();
    }

    @PutMapping
    public UserDto updateUser(@RequestBody UserDto userDto) {
        return userService.updateUser(userDto);
    }

    @PostMapping("/logout")
    public void logout() {
        userService.logout();
    }
}
