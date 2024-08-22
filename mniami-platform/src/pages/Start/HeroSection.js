import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom'

export const HeroContainer = styled.section`
  background-color: #ddd;
  text-align: center;
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 24px;
    font-weight: 400;
    margin: 0;
  }

  p {
    font-size: 14px;
    padding: 10px;
  }

  @media (min-width: 768px) {
    h1 {
      font-size: 28px;
    }

    p {
      font-size: 18px;
    }
  }
`

export const RegisterButton = styled(NavLink)`
  padding: 10px 40px;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  border: 1px solid transparent;
  border-radius: 10px;
  text-decoration: none;
  color: #333;

  &.hover {
    background-color: red;
  }
`

const HeroSection = () => {
  return (
    <HeroContainer>
      <h1>Dołącz do nas</h1>
      <p>Gotowanie dla rodziny nigdy nie było takie proste</p>
      <RegisterButton to="/auth">Załóż konto</RegisterButton>
    </HeroContainer>
  )
}

export default HeroSection
