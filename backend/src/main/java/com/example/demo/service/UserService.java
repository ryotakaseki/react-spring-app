package com.example.demo.service;

import com.example.demo.dto.UserDto;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    // ユーザー情報をメモリ上に保持 (DBの代わり)
    private UserDto currentUser = new UserDto("Guest"); // 初期値を設定

    public UserDto getUser() {
        return this.currentUser;
    }

    public UserDto updateUser(UserDto userDto) {
        this.currentUser.setDisplayName(userDto.getDisplayName());
        return this.currentUser;
    }

    public void logout() {
        this.currentUser = new UserDto("Guest"); // ユーザー情報を初期状態に戻す
    }
}
