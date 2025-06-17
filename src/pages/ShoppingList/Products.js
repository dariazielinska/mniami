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
  color: ${(props) => (props.purchased ? '#999' : '#000')};
  text-decoration: ${(props) => (props.purchased ? 'line-through' : 'none')};
`

const ProductQuantity = styled.span`
  font-size: 14px;
  color: ${(props) => (props.purchased ? '#999' : '#666')};
  text-decoration: ${(props) => (props.purchased ? 'line-through' : 'none')};
`

const Products = ({ items, onDelete, onCheck }) => {
  const sortedItems = [...items].sort((a, b) => {
    if (a.purchased === b.purchased) return 0
    return a.purchased ? 1 : -1
  })

  return (
    <ProductsContainer>
      {sortedItems.length === 0 ? (
        <p>Twoja lista zakupów jest pusta.</p>
      ) : (
        <ProductsList>
          {sortedItems.map((item, index) => (
            <ProductItem key={index}>
              <ProductInfo>
                <ProductName purchased={item.purchased}>
                  {item.name}
                </ProductName>
                <ProductQuantity purchased={item.purchased}>
                  {item.quantity} {item.unit}
                </ProductQuantity>
              </ProductInfo>
              <ProductActions>
                {!item.purchased && (
                  <CheckBoxOutlineBlankIcon
                    style={{ color: '#ddd', cursor: 'pointer' }}
                    onClick={() => onCheck(item)}
                  />
                )}
                <DeleteIcon
                  style={{ color: '#333', cursor: 'pointer' }}
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
