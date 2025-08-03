import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import './ProfilePage.css';

function ProfilePage() {
    const { user, setUser } = useUser();
    const [displayName, setDisplayName] = useState('');

    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName);
        }
    }, [user]);

    const handleUpdate = () => {
        fetch('http://localhost:8080/api/user', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ displayName: displayName }),
        })
        .then(response => response.json())
        .then(updatedUser => {
            setUser(updatedUser);
            alert('プロフィールを更新しました！');
        })
        .catch(error => console.error('Error updating user:', error));
    };

    if (!user) return <p>Loading...</p>;

    return (
        <div className="profile-page">
            <h2>プロフィール設定</h2>
            <div className="profile-form">
                <label htmlFor="displayName">表示名:</label>
                <input
                    id="displayName"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                />
                <button onClick={handleUpdate}>更新</button>
            </div>
        </div>
    );
}

export default ProfilePage;
