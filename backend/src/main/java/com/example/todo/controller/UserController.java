package com.example.todo.controller;

import com.example.todo.dto.UserDto;
import com.example.todo.service.UserService;
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
