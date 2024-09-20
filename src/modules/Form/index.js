import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import navigate if needed
import Input from '../../components/input';
import Button from '../../components/button';

function Form({ isSigninPage = true }) {
  const [data, setData] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirmation: ''
  });

  const navigate = useNavigate(); // Use navigate if using react-router

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isSigninPage ? 'http://localhost:8000/users/sign_in' : 'http://localhost:8000/users';
      const payload = isSigninPage ? {
        user: {
          username: data.username,
          password: data.password
        }
      } : {
        user: {
          email: data.email,
          username: data.username,
          password: data.password,
          password_confirmation: data.passwordConfirmation
        }
      };
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        const token = response.headers.get('authorization');
        if (token) {
          localStorage.setItem('token', token); 
        }
        navigate('/');
      } else {
        alert(result.status.errors)
      }
    } catch (error) {
      console.error('Error during operation:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="bg-[#e1edff] h-screen flex justify-center items-center">
      <div className="bg-white w-[600px] h-[800px] shadow-lg rounded-lg flex flex-col justify-center items-center">
        <div className="text-4xl font-extrabold">Welcome {isSigninPage && 'Back'}</div>
        <div className="text-xl font-light mb-14">
          {isSigninPage ? 'Sign in now to get explored' : 'Sign up now to get started'}
        </div>
        <form className="flex flex-col items-center w-full" onSubmit={(e) => handleSubmit(e)}>
          {!isSigninPage && (
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="Enter your email"
              className="mb-6"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          )}
          <Input
            label="Username"
            name="username"
            placeholder="Enter your username"
            className="mb-6"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your Password"
            className="mb-6"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          {!isSigninPage && (
            <Input
              label="Password Confirmation"
              type="password"
              name="passwordConfirmation"
              placeholder="Confirm your Password"
              className="mb-14"
              value={data.passwordConfirmation}
              onChange={(e) => setData({ ...data, passwordConfirmation: e.target.value })}
            />
          )}
          <Button label={isSigninPage ? 'Sign in' : "Sign up"} type="submit" className="w-1/2 mb-4" />
        </form>
        <div>
          {isSigninPage ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span className="text-primary cursor-pointer underline" onClick={() => navigate(`/users/${isSigninPage ? 'sign_up' : 'sign_in'}`)}>
            {isSigninPage ? 'Sign up' : "Sign in"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Form;
