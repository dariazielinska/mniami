import React from 'react'
import styled from '@emotion/styled'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import DeleteIcon from '@mui/icons-material/Delete'

const ProductsContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`

const ProductsList = styled.ul`
  padding-inline-start: 0;
  width: 100%;
  margin: 0;
  list-style: none;

  @media (min-width: 768px) {
    width: 50%;
  }
`

const ProductItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const ProductActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const ProductName = styled.span`
  font-size: 16px;
  font-weight: 500;
`

const ProductQuantity = styled.span`
  font-size: 14px;
  color: #666;
`

const Products = ({ items, onDelete, onCheck }) => {
  return (
    <ProductsContainer>
      {items.length === 0 ? (
        <p>Twoja lista zakupów jest pusta.</p>
      ) : (
        <ProductsList>
          {items.map((item, index) => (
            <ProductItem key={index}>
              <ProductInfo>
                <ProductName>{item.name}</ProductName>
                <ProductQuantity>
                  {item.quantity} {item.unit}
                </ProductQuantity>
              </ProductInfo>
              <ProductActions>
                <CheckBoxOutlineBlankIcon
                  style={{ color: '#ddd', cursor: 'pointer' }}
                  onClick={() => onCheck(item)}
                />
                <DeleteIcon
                  style={{ color: '333', cursor: 'pointer' }}
                  onClick={() => onDelete(item)}
                />
              </ProductActions>
            </ProductItem>
          ))}
        </ProductsList>
      )}
    </ProductsContainer>
  )
}

export default Products
