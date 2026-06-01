import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setMenuOpen(false);
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  // 플래너 페이지에서는 헤더 숨김
  if (location.pathname === '/planner') return null;

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <span className="logo-icon">✈</span>
          <span className="logo-text">AI 콕콕 플래너</span>
        </Link>

        <button 
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>홈</Link>
          {currentUser ? (
            <>
              <Link to="/my-trips" onClick={() => setMenuOpen(false)}>내 여행</Link>
              <Link to="/planner" className="nav-cta" onClick={() => setMenuOpen(false)}>
                여행 만들기
              </Link>
              <div className="user-info">
                <span className="user-name">
                  {currentUser.displayName || currentUser.email?.split('@')[0]}
                </span>
                <button onClick={handleLogout} className="logout-btn">
                  로그아웃
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>로그인</Link>
              <Link to="/signup" className="nav-cta" onClick={() => setMenuOpen(false)}>
                시작하기
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
