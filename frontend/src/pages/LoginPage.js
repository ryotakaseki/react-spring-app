import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function LoginPage() {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleLogin = () => {
        // 1. ログインコードの検証
        fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: code }),
        })
        .then(response => {
            if (!response.ok) throw new Error('Login failed');
            // 2. ログイン成功後、ユーザー情報を取得
            return fetch('http://localhost:8080/api/user');
        })
        .then(response => response.json())
        .then(userData => {
            // 3. 取得したユーザー情報をContextにセット
            setUser(userData);
            // 4. メニューページへ遷移
            navigate('/menu');
        })
        .catch(error => {
            console.error('Login process error:', error);
            setError('コードが違うか、処理中にエラーが発生しました。');
        });
    };

    return (
        <div>
            <h2>ログイン</h2>
            <input
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="コードを入力"
            />
            <button onClick={handleLogin}>ログイン</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default LoginPage;