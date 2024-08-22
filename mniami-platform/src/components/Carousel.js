import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
`

const CarouselItems = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
  gap: 15px;
`

const CarouselItem = styled.div`
  flex: 1 0 20%; /* 5 items will take up full width of container */
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
`

const ItemImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`

const ItemTitle = styled.h3`
  margin: 10px 0 0;
  font-size: 16px;
`

const ViewAllButton = styled(Link)`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  display: inline-block;

  &:hover {
    background-color: #0056b3;
  }
`

const Carousel = ({ items, viewAllLink }) => {
  return (
    <CarouselContainer>
      <CarouselItems>
        {items.slice(0, 5).map((item, index) => (
          <CarouselItem key={index}>
            <ItemImage src={item.image} alt={item.title} />
            <ItemTitle>{item.title}</ItemTitle>
          </CarouselItem>
        ))}
      </CarouselItems>
      <ViewAllButton to={viewAllLink}>Zobacz Wszystko</ViewAllButton>
    </CarouselContainer>
  )
}

export default Carousel
