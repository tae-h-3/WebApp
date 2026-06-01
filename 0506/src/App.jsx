import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PlannerPage from './pages/PlannerPage';
import MyTripsPage from './pages/MyTripsPage';
import TripDetailPage from './pages/TripDetailPage';

// 보호된 라우트 컴포넌트 - 로그인이 필요한 페이지
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/planner" element={
            <ProtectedRoute><PlannerPage /></ProtectedRoute>
          } />
          <Route path="/my-trips" element={
            <ProtectedRoute><MyTripsPage /></ProtectedRoute>
          } />
          <Route path="/trip/:id" element={
            <ProtectedRoute><TripDetailPage /></ProtectedRoute>
          } />
        </Routes>
      </main>
    </>
  );
}

export default App;
