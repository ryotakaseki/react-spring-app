import React from 'react';
import { useUser } from '../context/UserContext';
import './ProfilePage.css';

function ProfilePage() {
    const { user } = useUser();

    if (!user) {
        return <p>ユーザー情報がありません。</p>;
    }

    return (
        <div className="profile-container">
            <h2>プロフィール</h2>
            <div className="profile-info">
                <p><strong>名前:</strong> {user.displayName}</p>
                <p><strong>メールアドレス:</strong> {user.email}</p>
            </div>
        </div>
    );
}

export default ProfilePage;