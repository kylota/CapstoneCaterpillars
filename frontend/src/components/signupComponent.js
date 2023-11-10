import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import './loginandregistration.css'

function SignUp(){

    const [password, setPassword] = useState('');
    const [showReEnter, setShowReEnter] = useState(false);
  
    const handlePasswordChange = (e) => {
      const newPassword = e.target.value;
      setPassword(newPassword);
  
      if (newPassword.trim() !== '') {
        setShowReEnter(true);
      } else {
        setShowReEnter(false);
      }
    };
  

    return (
        <div>
            
            <form action="">
            <h2 className = "">Sign Up</h2>
                <div className = "">
                
                <div className="input-container">
                    <label for = "emailInput">Email</label>
                    <input placeholder='Enter Email' id = "emailInput"/>
                </div>
                <div className="input-container">
                    <label for = "passwordInput">Password</label>
                    <input placeholder='Enter Password' id = "passwordInput" onChange={handlePasswordChange}/>
                    </div>

            {showReEnter && (
            <div className="input-container">
              <label htmlFor="reEnterInput">Re-enter Password</label>
              <input
                placeholder="Re-enter Password"
                id="reEnterInput"
              />
            </div>
          )}
                   
                </div>
                <button className="">Sign Up</button>
                <Link to="/" className="link"> Login</Link>

            </form>
        </div>

    );
}

export default SignUp