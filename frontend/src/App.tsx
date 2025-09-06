import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import TodoPage from './pages/TodoPage';
import ProfilePage from './pages/ProfilePage';
import Header from './components/Header';
import './styles/Layout.scss';

const AppContent: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useUser();
    const showHeader = location.pathname !== '/';

    useEffect(() => {
        if (!user && location.pathname !== '/') {
            navigate('/');
        }
    }, [user, location, navigate]);

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

const App: React.FC = () => {
  return (
    <UserProvider>
        <Router>
            <AppContent />
        </Router>
    </UserProvider>
  );
};

export default App;