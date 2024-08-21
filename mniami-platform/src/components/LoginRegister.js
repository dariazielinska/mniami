import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login, signup } = useAuth();

    const handleSignUp = async () => {
        try {
            await signup(email, password);
            navigate('/');
          } catch (e) {
            console.log('Failed to create an account', e);
          }
      };
    
      const handleSignIn = async () => {
        try {
            await login(email, password);
            navigate('/');
          } catch (e) {
            console.log('Failed to log in', e);
          }
      };

    return (
      <div>
          ZAKŁADKA LOGOWANIE & REJESTRACJA
          <div>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email" 
              />
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password" 
              />
              <div>
                <button onClick={handleSignUp}> Sign Up </button>
                <button onClick={handleSignIn}> Sign In </button>
              </div>
          </div>
        </div>
    );
  }
  
  export default LoginRegister;  
