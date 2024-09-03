import styled from '@emotion/styled'
import SearchIcon from '@mui/icons-material/Search'

const SearchBarContainer = styled.div`
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

const SearchInputContainer = styled.div`
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

const SearchBar = ({ user, subText, placeholder }) => {
  return (
    <SearchBarContainer>
      <Greeting>Cześć Użytkownik!</Greeting>
      <SubText>{subText}</SubText>
      <SearchInputContainer>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <Input type="text" placeholder={placeholder} />
        <Button>SZUKAJ</Button>
      </SearchInputContainer>
    </SearchBarContainer>
  )
}

export default SearchBar
