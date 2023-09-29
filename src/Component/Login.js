import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login({ userData ,onLogin}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormFilled, setIsFormFilled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFormFilled(email !== '' && password !== '');
  }, [email, password]);

  const handleLogin = (e) => {
    e.preventDefault();
  
    const user = userData.find((userData) => userData.email === email);
  
    if (user) {
      if (user.password === password) {
        // Successful login, pass user data to the parent component
        console.log("User data in Login:", user);
        onLogin(user); // Pass the user data to the parent component
        navigate('/'); // Navigate to home page
      } else {
        alert('Invalid password. Please try again.');
      }
    } else {
      alert('Invalid email. Please try again.');
    }
  };


  const handleGuestLogin = () => {
    // Create default guest user data
    const guestUser = {
      username: 'stuti',
      email: 'singh.rimpi99@gmail.com',
      password: '12345',
    };

    // Log in with the guest user data
    onLogin(guestUser);

    // Navigate to home page
    navigate('/');
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-inner-container">
          <Link to={"/"} className="login-title">EYESOME</Link>
          <form className="login-form" onSubmit={handleLogin}>
            <h1 className="login-heading">Login to your account</h1>
            <div className="login-details">
              <div className="login-info1">
                <label className="login-label" htmlFor="email">
                  Email
                </label>
                <input
                  className="login-input"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="login-info2">
                <label className="login-label" htmlFor="password">
                  Password
                </label>
                <input
                  className="login-input"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="button-container">
              <button className={`loggin-btn1 ${isFormFilled ? 'filled' : ''}`} type="submit">
                Login
              </button>
              <button className="loggin-btn2" onClick={handleGuestLogin}>
                Login as a Guest
              </button>
              <Link to={"/signup"} className="new_acc_link">
                Create New Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
