import React, { useState, useEffect } from 'react';

function MenuPage() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/api/menu-message')
            .then(response => response.json())
            .then(data => setMessage(data.message))
            .catch(error => console.error('Fetch error:', error));
    }, []);

    return (
        <div>
            <h2>ダッシュボード</h2>
            <p>{message}</p>
            <p>ヘッダーから各ページに移動してください。</p>
        </div>
    );
}

export default MenuPage;
