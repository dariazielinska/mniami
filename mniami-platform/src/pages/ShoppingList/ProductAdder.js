import { useState } from 'react'
import styled from '@emotion/styled'
import SearchIcon from '@mui/icons-material/Search'

const ProductAdderContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ddd;
  justify-content: center;
`

const Greeting = styled.h1`
  width: 90%;
  text-align: left;
  font-size: 17px;
  font-weight: 500;
  margin: 0;
`

const SubText = styled.p`
  width: 90%;
  text-align: left;
  font-size: 15px;
  margin: 15px 0;
  color: #333;
`

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  justify-content: left;
  padding: 6px;
`

const SearchIconWrapper = styled.div`
  color: #7f7e7e;
`

const Input = styled.input`
  border: none;
  outline: none;
  background: transparent;
  padding: 5px;
  font-size: 14px;
  color: #333;
  width: 100%;

  ::placeholder {
    color: #ddd;
  }
`

const Button = styled.button`
  display: none;
  padding: 10px 40px;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  border: 1px solid transparent;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  text-align: center;
  cursor: pointer;

  @media (min-width: 768px) {
    display: block;
  }
`

const ProductAdder = ({ onAddProduct }) => {
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleAddProduct = () => {
    if (inputValue.trim() === '') {
      return
    }

    const newProduct = {
      name: inputValue,
      quantity: 1,
      unit: 'szt.',
      purchased: false,
    }

    onAddProduct(newProduct)

    setInputValue('')
  }

  return (
    <ProductAdderContainer>
      <Greeting>Cześć Użytkownik!</Greeting>
      <SubText>Co trzeba jeszcze kupić?</SubText>
      <InputContainer>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <Input
          type="text"
          placeholder={'papier toaletowy, banany, woda'}
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button onClick={handleAddProduct}>DODAJ</Button>
      </InputContainer>
    </ProductAdderContainer>
  )
}

export default ProductAdder
