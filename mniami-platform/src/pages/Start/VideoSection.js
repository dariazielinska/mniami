import styled from '@emotion/styled'

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
    width: 90%;
    font-size: 22px;
  }
`

const Content = styled.div`
  width: 90%;

  @media (min-width: 768px) {
    width: 45%;
  }

  p {
    text-align: justify;
  }
`

const Video = styled.div`
  width: 90%;
  height: 40vh;

  @media (min-width: 768px) {
    width: 50%;
    margin-right: 10px;
    height: 40vh;
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Content>
      <Video>
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video player"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Video>
    </SectionContainer>
  )
}

export default VideoSection
