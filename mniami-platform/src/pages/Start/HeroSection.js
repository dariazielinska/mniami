import styled from '@emotion/styled'
import CallToActionButton from '../../styles/CallToActionButton'

const HeroContainer = styled.section`
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

const HeroSection = () => {
  return (
    <HeroContainer>
      <h1>Dołącz do nas</h1>
      <p>Gotowanie dla rodziny nigdy nie było takie proste</p>
      <CallToActionButton to="/register">Załóż konto</CallToActionButton>
    </HeroContainer>
  )
}

export default HeroSection
