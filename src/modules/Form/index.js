import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' // Import navigate if needed
import Input from '../../components/input';
import Button from '../../components/button';

function Form({ isSigninPage = true }) {
  const [data, setData] = useState({
    fullName: !isSigninPage ? '' : undefined,
    email: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
  }

  const navigate = useNavigate(); // Use navigate if using react-router

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
              label="Full Name"
              name="fullName"
              placeholder="Enter your full name"
              className="mb-6"
              value={data.fullName}
              onChange={(e) => setData({ ...data, fullName: e.target.value })}
            />
          )}
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            className="mb-6"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your Password"
            className="mb-14"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <Button label={isSigninPage ? 'Sign in' : "Sign up"} type="submit" className="w-1/2 mb-4" />
        </form>
        <div>
          {isSigninPage ? "Didn't have an account?" : 'Already have an account?'}{' '}
          <span className="text-primary cursor-pointer underline" onClick={() => navigate(`/users/${isSigninPage ? 'sign_up' : 'sign_in'}`)}>
            {isSigninPage ? 'Sign up' : "Sign in"}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Form;
