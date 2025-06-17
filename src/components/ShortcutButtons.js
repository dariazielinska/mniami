import React from 'react'
import styled from '@emotion/styled'

const ShortcutContainer = styled.div`
  display: grid;
  gap: 20px;
  width: 90%;
  margin: 20px auto;
  grid-template-columns: repeat(2, 1fr);

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  }
`

const ShortcutButton = styled.button`
  padding: 10px 20px;
  background-color: #ddd;
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const ShortcutButtons = ({ type, items, onFilter }) => {
  const columns = type === 'recipes' ? 5 : 4

  const handleClick = (value) => {
    if (onFilter) {
      onFilter(value)
    }
  }

  return (
    <ShortcutContainer columns={columns}>
      {items.map((item, index) => (
        <ShortcutButton key={index} onClick={() => handleClick(item.value)}>
          {item.label}
        </ShortcutButton>
      ))}
    </ShortcutContainer>
  )
}

export default ShortcutButtons
