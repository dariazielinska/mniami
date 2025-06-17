/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'

const Main = styled.main`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`

const Description = styled.p`
  margin-bottom: 2rem;
`

const PlansWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`

const PlanCard = styled.div`
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
`

const PremiumCard = styled(PlanCard)`
  border: 2px solid #4caf50;
  background-color: #f9fff9;
`

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`

function Pricing() {
  return (
    <div>
      <Header />
      <Main>
        <Title>Wybierz swój plan</Title>
        <Description>
          Zyskaj więcej dzięki wersji Premium – więcej przepisów, automatyczna
          lista zakupów i planowanie dla całej rodziny.
        </Description>

        <PlansWrapper>
          <PlanCard>
            <h2>Bezpłatnie</h2>
            <ul>
              <li>✅ Planowanie posiłków</li>
              <li>✅ Lista zakupów</li>
              <li>❌ Przepisy premium</li>
              <li>❌ Personalizacja diety</li>
            </ul>
          </PlanCard>

          <PremiumCard>
            <h2>Premium – 19,99 zł/mies.</h2>
            <ul>
              <li>✅ Wszystko z wersji darmowej</li>
              <li>✅ Przepisy premium</li>
              <li>✅ Personalizacja diety</li>
              <li>✅ Planowanie rodzinne</li>
            </ul>
            <Button>Rozpocznij 7 dni za darmo</Button>
          </PremiumCard>
        </PlansWrapper>
      </Main>
      <Footer />
    </div>
  )
}

export default Pricing
