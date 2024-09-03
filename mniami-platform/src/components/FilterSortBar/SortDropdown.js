import styled from '@emotion/styled'
import { useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

const SortContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 2px;
`

const SortText = styled.span`
  font-style: italic;
`

const SortDropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 150px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 1;
`

const SortOption = styled.div`
  padding: 10px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #f0f0f0;
  }
`

const SortDropdown = ({ sortOptions, selectedOption, onOptionSelect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev)
  }

  return (
    <SortContainer onClick={toggleDropdown}>
      <SortText>Sortuj według: {selectedOption}</SortText>
      <SortDropdownMenu isOpen={isDropdownOpen}>
        {sortOptions.map((option) => (
          <SortOption key={option} onClick={() => onOptionSelect(option)}>
            {option}
          </SortOption>
        ))}
      </SortDropdownMenu>
      <ArrowDropDownIcon />
    </SortContainer>
  )
}

export default SortDropdown
