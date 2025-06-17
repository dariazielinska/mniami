import styled from '@emotion/styled'
import CallToActionButton from '../../styles/CallToActionButton'

const SectionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

    @media (min-width: 768px) {
      width: 90%;
      margin: 30px auto;
      flex-direction: row;
    }
  }
`

const Title = styled.h2`
  width: 100%;
  text-align: left;
  font-weight: 600;
  font-size: 18px;

  @media (min-width: 768px) {
    font-size: 22px;
  }
`

const Content = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    width: 45%;
  }

  p {
    text-align: justify;
    margin: 20px 0;
  }
`

const Video = styled.div`
  width: 90%;
  height: 40vh;
  margin-top: 20px;

  @media (min-width: 768px) {
    width: 50%;
    margin-right: 10px;
    height: 40vh;
    margin-top: 0;
  }

  @media (min-width: 1210px) {
    height: 50vh;
  }
`

const VideoSection = () => {
  return (
    <SectionContainer>
      <Content>
        <Title>Przeczytaj, zaplanuj, zrób zakupy, ugotuj i odpocznij!</Title>
        <p>
          Gotowanie w domu nie musi być stresujące. Dzięki naszym prostym
          przepisom, gotowym listom zakupów i sprytnym planom tygodniowym możesz
          z łatwością ogarnąć posiłki dla całej rodziny. Bez marnowania
          jedzenia, bez zbędnych wydatków — tylko pyszne, domowe jedzenie, które
          wszyscy pokochają. Z nami planowanie to nie obowiązek, a przyjemność!
        </p>
        <CallToActionButton to="/help">Przeczytaj więcej</CallToActionButton>
      </Content>
      <Video>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/oOVnfLEhPOI?si=dQ_gIPBV6YIiQfHS"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </Video>
    </SectionContainer>
  )
}

export default VideoSection
