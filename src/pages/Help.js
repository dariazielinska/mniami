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

const FAQItem = styled.div`
  margin-bottom: 1.5rem;
`

const Question = styled.h2`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`

const Answer = styled.p`
  color: #555;
`

function Help() {
  return (
    <div>
      <Header />
      <Main>
        <Title>Pomoc i najczęstsze pytania</Title>
        <Description>
          Masz pytanie? Sprawdź poniżej najczęściej zadawane pytania i
          odpowiedzi.
        </Description>

        <FAQItem>
          <Question>Jak anulować subskrypcję?</Question>
          <Answer>
            Możesz anulować subskrypcję w dowolnym momencie z poziomu ustawień
            konta. Subskrypcja pozostanie aktywna do końca opłaconego okresu.
          </Answer>
        </FAQItem>

        <FAQItem>
          <Question>Czy mogę korzystać z aplikacji za darmo?</Question>
          <Answer>
            Tak, dostępna jest darmowa wersja z podstawowymi funkcjami, takimi
            jak planowanie posiłków i lista zakupów.
          </Answer>
        </FAQItem>

        <FAQItem>
          <Question>Co zawiera wersja Premium?</Question>
          <Answer>
            Wersja Premium oferuje dodatkowe funkcje, w tym personalizację
            diety, planowanie rodzinne oraz dostęp do przepisów premium.
          </Answer>
        </FAQItem>

        <FAQItem>
          <Question>Jak skontaktować się z pomocą techniczną?</Question>
          <Answer>
            Skorzystaj z formularza kontaktowego w aplikacji lub napisz na
            adres: pomoc@mniami.pl
          </Answer>
        </FAQItem>
      </Main>
      <Footer />
    </div>
  )
}

export default Help
