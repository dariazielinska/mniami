import styled from '@emotion/styled'

const Container = styled.section`
  background-color: #ddd;
  text-align: center;
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    width: 90%;
    text-align: justify;
  }
}
`

const Title = styled.h2`
  width: 90%;
  text-align: left;
  font-weight: 600;
  font-size: 18px;
  margin: 0 auto;

  @media (min-width: 768px) {
    font-size: 22px;
  }
`

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    width: 90%;
    justify-content: space-between;
  }
`
const AppButton = styled.a`
  font-size: 1rem;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 10px;
  text-decoration: none;
  color: #333;
  width: 90%;
  margin: 20px 0;
  padding: 10px 0;
  cursor: pointer;

  @media (min-width: 768px) {
    width: 45%;
  }
`

const GetTheAppSection = () => {
  return (
    <Container>
      <Title>Jeszcze wygodniej z aplikacją mobilną</Title>
      <p>
        Dołącz do naszej społeczności i korzystaj z naszych usług w dowolnym
        miejscu i czasie. Pobierz aplikację na swoje urządzenie mobilne, aby
        uzyskać dostęp do wszystkich funkcji
      </p>
      <ButtonsContainer>
        <AppButton
          href="https://play.google.com/store/apps"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pobierz z Google Play
        </AppButton>
        <AppButton
          href="https://apps.apple.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pobierz z App Store
        </AppButton>
      </ButtonsContainer>
    </Container>
  )
}

export default GetTheAppSection
