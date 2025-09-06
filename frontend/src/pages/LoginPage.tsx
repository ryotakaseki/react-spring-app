import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../styles/LoginPage.scss';

const LoginPage: React.FC = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleLogin = () => {
        fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: code }),
        })
        .then(response => {
            if (!response.ok) throw new Error('Login failed');
            return fetch('http://localhost:8080/api/user');
        })
        .then(response => response.json())
        .then(userData => {
            setUser(userData);
            navigate('/menu');
        })
        .catch(error => {
            console.error('Login process error:', error);
            setError('コードが違うか、処理中にエラーが発生しました。');
        });
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2>ログイン</h2>
                <input
                    type="password"
                    value={code}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
                    placeholder="ログインIDを入力してください"
                    className="input-field"
                />
                <button onClick={handleLogin} className="login-button">ログイン</button>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
}

export default LoginPage;