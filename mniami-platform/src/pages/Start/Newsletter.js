import styled from '@emotion/styled'
import CallToActionButton from '../../styles/CallToActionButton'

const Container = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ddd;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  text-align: center;
  padding-bottom: 20px;
`

const Image = styled.div`
  width: 50%;
  aspect-ratio: 1;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  //background-image: url();
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  margin: 20px 0;

  @media (min-width: 768px) {
    width: 20%;
    margin-right: 8px;
  }
`

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
`

const Description = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
  width: 90%;
`

const Input = styled.input`
  padding: 10px;
  width: 90%;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 15px 0 20px 0;
`

const Newsletter = () => {
  return (
    <Container>
      <Image />
      <Title>Zapisz się do naszego newslettera</Title>
      <Description>
        Otrzymuj najnowsze informacje i aktualizacje bezpośrednio na swoją
        skrzynkę e-mail.
      </Description>
      <Input type="email" placeholder="Wpisz swój adres e-mail" />
      <CallToActionButton to="/help">Zapisz się</CallToActionButton>
    </Container>
  )
}

export default Newsletter
