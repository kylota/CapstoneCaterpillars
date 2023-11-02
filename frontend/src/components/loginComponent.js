import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login({onLogin}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email and password if needed
  
    // Send request to backend to verify email and password
    try {
      //begin API call
      const response = await fetch("http://localhost:4000/testAPI/login", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (data.success) { //Successful API response
        console.log('Successful')
        onLogin();
      } else {
        console.log('failed') //Unsuccessful API response
      }
    } catch (error) {
      console.error(error);
      console.log(error)
    }
};
  

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="">
          <label>Email</label>
          <input 
            placeholder="Enter Email" 
            name="email"
            maxLength="45"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="">
          <label>Password</label>
          <input 
            placeholder="Enter Password" 
            name="password"
            maxLength="15"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" className="">
          Log in
        </button>
        <Link to="/signup" className="">
          Create Account
        </Link>
      </form>
    </div>
  );
}

export default Login;