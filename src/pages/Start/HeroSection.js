import styled from '@emotion/styled'
import CallToActionButton from '../../styles/CallToActionButton'
import MealPlanningImg from '../../assets/meal_planning.png'

const HeroContainer = styled.section`
  text-align: center;
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  min-height: 200px;
  justify-content: center;

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

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  opacity: 0.4;
  max-height: 320px;
`

const HeroSection = () => {
  return (
    <HeroContainer>
      <BackgroundImage src={MealPlanningImg} alt="Meal Planning" />
      <h1>Dołącz do nas</h1>
      <p>Gotowanie dla rodziny nigdy nie było takie proste</p>
      <CallToActionButton to="/register">Załóż konto</CallToActionButton>
    </HeroContainer>
  )
}

export default HeroSection
