import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthProvider'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import styled from '@emotion/styled'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 30px;

  p {
    width: 85%;
  }

  ul {
    width: 85%;
    padding-right: 20px;
  }

  ul li {
    margin: 20px 0;
  }

  input,
  button {
    box-sizing: border-box;
    width: 85%;
    background-color: #fff;
    padding: 11px;
    border: 1px solid #ddd;
    margin: 10px 0;
    cursor: pointer;
  }

  button {
    background-color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }

  @media (min-width: 768px) {
    width: 60%;
    margin: 0 auto;
  }
`

const Title = styled.h2`
  width: 100%;
  text-align: center;
  margin: 30px auto 15px auto;
  font-weight: 500;
  font-size: 18px;

  @media (min-width: 768px) {
    font-size: 22px;
  }
`

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { signup } = useAuth()

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      setError('Proszę wypełnić wszystkie pola.')
      return
    }

    if (password !== confirmPassword) {
      setError('Hasła nie pasują do siebie.')
      return
    }

    try {
      await signup(email, password)
      navigate('/recipes')
    } catch (e) {
      console.log('Failed to create an account', e)
      setError('Nie udało się utworzyć konta. Spróbuj ponownie.')
    }
  }

  return (
    <>
      <Header />
      <Container>
        <Title>BARDZO MIŁO CIĘ TU WIDZIEĆ</Title>

        <p>Wypełnij poniższy formularz, a my zajmiemy się resztą!</p>

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
          placeholder="Hasło"
        />

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Powtórz hasło"
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button onClick={handleSignUp}>ZAŁÓŻ KONTO</button>

        <p>Dzięki rejestracji zyskasz wiele korzyści:</p>
        <ul>
          <li>Łatwo i szybko zaplanujesz posiłki dla całej rodziny</li>
          <li>Zyskasz dostęp do wartościowych i zróżnicowanych przepisów</li>
          <li>Wszystkie ulubione przepisy zatrzymasz w jednym miejscu</li>
          <li>Utrzymasz dziennik jedzenia pod kontrolą</li>
          <li>
            Dostaniesz wskazówki na temat sezonowych produktów, rozwoju dziecka
            czy wychowania
          </li>
          <li>
            Otrzymasz dostęp do wyszkolonego zespołu wsparcia, który pomoże za
            każdym razem, jak tylko będziesz mieć problem
          </li>
        </ul>
      </Container>
      <Footer />
    </>
  )
}

export default Register
