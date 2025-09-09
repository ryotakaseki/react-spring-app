package com.example.todo.service;

import com.example.todo.dto.UserDto;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    // ユーザー情報をメモリ上に保持 (DBの代わり)
    private UserDto currentUser = new UserDto("Guest", "guest@example.com"); // 初期値を設定

    public UserDto getUser() {
        return this.currentUser;
    }

    public UserDto updateUser(UserDto userDto) {
        this.currentUser.setDisplayName(userDto.getDisplayName());
        this.currentUser.setEmail(userDto.getEmail());
        return this.currentUser;
    }

    public void logout() {
        this.currentUser = new UserDto("Guest"); // ユーザー情報を初期状態に戻す
    }
}
