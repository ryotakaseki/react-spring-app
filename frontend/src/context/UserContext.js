import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const logout = async () => {
        try {
            // 1. バックエンドのログアウトAPIを呼び出す
            await fetch('http://localhost:8080/api/user/logout', { method: 'POST' });
            // 2. クライアント側のユーザー情報をクリア
            setUser(null);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
