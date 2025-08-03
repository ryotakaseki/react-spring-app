import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import TodoPage from './pages/TodoPage';
import ProfilePage from './pages/ProfilePage';
import Header from './components/Header';
import './styles/App.css';

// ヘッダーを表示するかどうかを判定するコンポーネント
const AppContent = () => {
    const location = useLocation();
    const showHeader = location.pathname !== '/'; // ルートパス(ログイン画面)以外でヘッダーを表示

    return (
        <div className="app-container">
            {showHeader && <Header />}
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/todos" element={<TodoPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Routes>
            </main>
        </div>
    );
};

function App() {
  return (
    <UserProvider>
        <Router>
            <AppContent />
        </Router>
    </UserProvider>
  );
}

export default App;