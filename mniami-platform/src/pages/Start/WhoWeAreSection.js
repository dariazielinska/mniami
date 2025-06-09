import styled from '@emotion/styled'
import CallToActionButton from '../../styles/CallToActionButton'
import aboutUs from '../../assets/aboutUs.png'

const SectionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    width: 90%;
    text-align: justify;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    width: 90%;
    margin: 0 auto;
    justify-content: space-between;

    p {
      text-align: justify;
      width: 56%;
    }
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
    width: 100%;
  }
`

const Image = styled.img`
  width: 90%;
  height: 90%;
  margin: 30px 0 15px 0;
  aspect-ratio: 1;
  border-radius: 8px;

  @media (min-width: 768px) {
    width: 40%;
    margin-right: 8px;
  }
`

const WhoWeAreSection = () => {
  return (
    <SectionContainer>
      <Title>Kim jesteśmy?</Title>
      <Image src={aboutUs} alt="About Us" />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <CallToActionButton to="/help">
        Dowiedz się o nas więcej
      </CallToActionButton>
    </SectionContainer>
  )
}

export default WhoWeAreSection
