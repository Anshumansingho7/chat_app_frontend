import React from 'react';
import './App.css';
import Form from './modules/Form';
import Dashboard from './modules/Dashboard';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children, auth = false }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Set the Authorization header
          const response = await fetch('http://localhost:8000/current_user', {
            method: 'GET',
            headers: { 
              Authorization: `${token}` 
            }
          });

          const result = await response.json();
          console.log(result.user)
          setCurrentUser(result.user)
          if (response.status === 200) {
            setIsLoggedIn(true);
          }
        }
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner/loading indicator
  }

  if (!isLoggedIn && auth) {
    return <Navigate to='/users/sign_in' />;
  } else if (isLoggedIn && ['/users/sign_in', '/users/sign_up'].includes(location.pathname)) {
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
