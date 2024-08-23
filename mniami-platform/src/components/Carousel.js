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
    &:hover a:last-child {
      background-color: #cccccc45;
    }
    &:hover a:last-child h3 {
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

  &:last-child {
    aspect-ratio: 2;

    h3 {
      margin-top: 10px;
    }
  }

  @media (min-width: 941px) {
    &:last-child {
      position: absolute;
      top: 0;
      left: 95%;
      background-color: transparent;
      transition: background-color 0.3s ease;
      min-width: initial;
      max-width: 10%;
      margin-right: 0;
      height: 80%;
      display: flex;
      align-items: center;
    }

    &:last-child h3 {
      color: transparent;
      transition: color 0.3s ease;
      margin-top: 0;
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
        <CarouselItem to={viewAllLink}>
          <ItemTitle>Zobacz więcej</ItemTitle>
        </CarouselItem>
      </CarouselItems>
    </>
  )
}

export default Carousel
