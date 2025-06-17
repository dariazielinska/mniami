import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthProvider'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom'

const Container = styled.div`
  @media (min-width: 768px) {
    display: flex;
    width: 100%;
    margin: 30px 0;
    justify-items: space-between;
  }
`

const Title = styled.h2`
  width: 100%;
  text-align: center;
  margin: 30px auto;
  font-weight: 500;
  font-size: 18px;

  @media (min-width: 768px) {
    font-size: 22px;
  }
`

const LoginSection = styled.div`
  width: 100%;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;

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
`

const RegisterSection = styled.div`
  width: 100%;
  border-right: 1px solid #ddd;
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
`

const Divider = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
  text-align: center;
  margin: 10px 0;
  color: #666;
  font-size: 14px;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #ddd;
  }

  &::before {
    margin-right: 10px;
  }

  &::after {
    margin-left: 10px;
  }
`

const RegisterButton = styled(NavLink)`
  box-sizing: border-box;
  width: 85%;
  background-color: #fff;
  padding: 11px;
  border: 1px solid #ddd;
  margin: 10px 0;
  background-color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  text-decoration: none;
  color: #333;
  text-align: center;
`

const LoginRegister = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSignIn = async () => {
    try {
      await login(email, password)
      navigate('/recipes')
    } catch (e) {
      console.log('Failed to log in', e)
    }
  }

  return (
    <>
      <Header />
      <Container>
        <LoginSection>
          <Title>MAM JUŻ SWOJE KONTO</Title>
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
          <button onClick={handleSignIn}> ZALOGUJ SIĘ </button>
          <Divider>lub</Divider>
          <button> ZALOGUJ SIĘ PRZEZ FACEBOOKA </button>
          <button> ZALOGUJ SIĘ PRZEZ GOOGLE </button>
        </LoginSection>
        <RegisterSection>
          <Title>CHCĘ DOŁĄCZYĆ</Title>
          <p>Dzięki rejestracji zyskasz wiele korzyści:</p>
          <ul>
            <li>Łatwo i szybko zaplanujesz posiłki dla całej rodziny</li>
            <li>Zyskasz dostęp do wartościowych i zróżnicowanych przepisów</li>
            <li>Wszystkie ulubione przepisy zatrzymasz w jednym miejscu</li>
            <li>Utrzymasz dziennik jedzenia pod kontrolą</li>
            <li>
              Dostaniesz wskazówki na temat sezonowych produktów, rozwoju
              dziecka czy wychowaniu
            </li>
            <li>
              Otrzymasz dostęp do wyszkolonego zespołu wsparcia, który pomoże za
              każdym razem, jak tylko będziesz mieć problem
            </li>
          </ul>
          <RegisterButton to="/register"> ZAŁÓŻ KONTO </RegisterButton>
        </RegisterSection>
      </Container>
      <Footer />
    </>
  )
}

export default LoginRegister
