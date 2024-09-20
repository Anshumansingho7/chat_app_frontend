import React, { useEffect, useState } from 'react';
import './App.css';
import Form from './modules/Form';
import Dashboard from './modules/Dashboard';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, auth = false }) => {
  const token = localStorage.getItem('token'); 
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const location = useLocation();
  const navigate = useNavigate();

  const checkAuth = async () => {
    if (token) {
      try {
        const response = await fetch('http://localhost:8000/current_user', {
          method: 'GET',
          headers: { 
            Authorization: `${token}` 
          }
        });
        const result = await response.json();
        if (response.status === 200 && result.user) {
          setCurrentUser(result.user);
        } else if (result?.status === 401 && result?.message === 'User has no active session') {
          console.log("i run here")
          localStorage.removeItem('token')
          const token = localStorage.getItem('token')
          if (!token) {
            navigate('/users/sign_in')
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth(); 
  }, [token, navigate]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!token && auth) {
    localStorage.removeItem('token')
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/users/sign_in')
    }
  } 

  if (token && ['/users/sign_in', '/users/sign_up'].includes(location.pathname)) {
    return <Navigate to='/' />;
  }

  return React.cloneElement(children, { currentUser });
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute auth={true}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path='users/sign_in' element={
          <ProtectedRoute>
            <Form isSigninPage={true} />
          </ProtectedRoute>
        } />
        <Route path='users/sign_up' element={
          <ProtectedRoute>
            <Form isSigninPage={false} />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
