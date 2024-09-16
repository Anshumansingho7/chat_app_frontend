import './App.css';
import Form from './modules/Form';
import Dashboard from './modules/Dashboard';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, auth = false }) => {
  const isLoggedIn = localStorage.getItem('user:token') !== null;
  const location = useLocation();

  if (!isLoggedIn && auth) {
    return <Navigate to='/users/sign_in' />;
  } else if (isLoggedIn && ['/users/sign_in', '/users/sign_up'].includes(location.pathname)) {
    return <Navigate to='/' />;
  }

  return children;  
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
