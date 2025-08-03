import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './Header.css';

function Header() {
    const { user, logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/'); // ログアウト後にログインページへ遷移
    };

    return (
        <header className="app-header">
            <div className="app-header-logo">
                <Link to="/menu">MyApp</Link>
            </div>
            <nav className="app-header-nav">
                <Link to="/todos">TODOリスト</Link>
                <Link to="/profile">プロフィール</Link>
            </nav>
            <div className="app-header-user">
                {user ? (
                    <>
                        <span>ようこそ、{user.displayName}さん</span>
                        <button onClick={handleLogout} className="logout-button">ログアウト</button>
                    </>
                ) : (
                    <span>ゲストさん</span>
                )}
            </div>
        </header>
    );
}

export default Header;
