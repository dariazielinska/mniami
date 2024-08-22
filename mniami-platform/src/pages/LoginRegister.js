import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthProvider'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'

const LoginRegister = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { login, signup } = useAuth()
  const handleSignUp = async () => {
    try {
      await signup(email, password)
      navigate('/recipes')
    } catch (e) {
      console.log('Failed to create an account', e)
    }
  }

  const handleSignIn = async () => {
    try {
      await login(email, password)
      navigate('/recipes')
    } catch (e) {
      console.log('Failed to log in', e)
    }
  }

  return (
    <div>
      <Header />
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
      <Footer />
    </div>
  )
}

export default LoginRegister
