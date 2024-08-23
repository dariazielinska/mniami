import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

const CarouselTitle = styled.h2`
  width: 90%;
  text-align: left;
  margin: 30px auto;
  font-weight: 600;
  font-size: 18px;

  @media (min-width: 768px) {
    font-size: 22px;
  }
`

const CarouselItems = styled.div`
  margin: 20px auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 90%;
  position: relative;

  @media (max-width: 940px) {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
  }

  @media (min-width: 941px) {
    &:hover div:last-child {
      background-color: #cccccc45;
    }
    &:hover div:last-child > a {
      color: #333;
    }
  }
`

const CarouselItem = styled(Link)`
  flex: 1;
  aspect-ratio: 1;
  border-radius: 8px;
  text-align: center;
  margin-right: 10px;
  min-width: 160px;
  cursor: pointer;
  text-decoration: none;
  color: #333;

  @media (min-width: 941px) {
    &:last-child {
      position: absolute;
      top: 0;
      left: 95%;
      height: 80%;
      background-color: transparent;
      transition: background-color 0.3s ease;
      min-width: initial;
      max-width: 10%;
      margin-right: 0;
    }
  }
`

const ItemImage = styled.div`
  width: 100%;
  height: 80%;
  border-radius: 8px;
  background-color: #ddd;
`

const ItemTitle = styled.h3`
  font-size: 16px;
  font-weight: 300;
  margin: 0;
  text-decoration: none;
  color: #333;
`

const ViewAllButton = styled.div`
  width: 100%;
  height: 70%;
  position: relative;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: #333;
  }

  @media (min-width: 941px) {
    height: 100%;
    a {
      color: transparent;
    }
  }
`

const Carousel = ({ type, items, category, viewAllLink }) => {
  return (
    <>
      <CarouselTitle>{type}</CarouselTitle>
      <CarouselItems>
        {items.slice(0, 5).map((item, index) => (
          <CarouselItem to={`/${category}/${item.id}`} key={index}>
            {/* <ItemImage src={item.image} alt={item.title} /> */}
            <ItemImage></ItemImage>
            <ItemTitle>{item.title}</ItemTitle>
          </CarouselItem>
        ))}
        <CarouselItem>
          <ViewAllButton>
            <Link to={viewAllLink}>Zobacz Więcej</Link>
          </ViewAllButton>
        </CarouselItem>
      </CarouselItems>
    </>
  )
}

export default Carousel
