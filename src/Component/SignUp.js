import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUp({ handleSignUp }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isFormFilled, setIsFormFilled] = useState(false);//for color change in background
  const navigate = useNavigate();

  useEffect(() => {
    setIsFormFilled(username !== '' && email !== '' && password !== '' && confirmPassword !== '');
  }, [username, email, password, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
  
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    // All details are correct, proceed to login page
    const userData = { username, email, password };
    console.log("User data in SignUp:", userData);
    handleSignUp(userData); // Pass the user data including username
    navigate('/login'); // Navigate to login page after successful sign-up
  };
  

  const isValidEmail = (email) => {
    // Basic email validation, you can enhance this as needed
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-inner-container">
          <div className="login-title">EYESOME</div>
          <form className="login-form" onSubmit={handleSubmit}>
            <h1 className="login-heading">Sign up</h1>
            <div className="login-details">
              <div className="login-info1">
                <input
                  className="login-input"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                   
                  }}
                />
              </div>
              <div className="login-info2">
                <input
                  className="login-input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                   
                  }}
                />
              </div>
              <div className="login-info3">
                <input
                  className="login-input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                   
                  }}
                />
              </div>
              <div className="login-info4">
                <input
                  className="login-input"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                   
                  }}
                />
              </div>
            </div>
            <div className="button-container">
              <button className={`loggin-btn1 ${isFormFilled ? 'filled' : ''}`} type="submit">
                Create Account
              </button>
              <Link to={"/login"} className="new_acc_link">
                Already have an account? <span className="signup-login">Login</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

