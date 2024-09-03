import styled from '@emotion/styled'
import { useState } from 'react'
import Filter from './Filter'
import SortDropdown from './SortDropdown'

const SortFilterContainer = styled.div`
  width: 90%;
  margin: 20px auto;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

const FilterSortBar = ({ type }) => {
  const [selectedSortOption, setSelectedSortOption] = useState('Data dodania')

  const sortOptions =
    type === 'recipes'
      ? [
          'Najnowsze',
          'Najstarsze',
          'Nazwa A-Z',
          'Nazwa Z-A',
          'Najbardziej popularne',
        ]
      : ['Najnowsze', 'Najstarsze', 'Najbardziej popularne']

  const handleSortOptionSelect = (option) => {
    setSelectedSortOption(option)
  }

  return (
    <SortFilterContainer>
      <Filter type={type} />
      <SortDropdown
        sortOptions={sortOptions}
        selectedOption={selectedSortOption}
        onOptionSelect={handleSortOptionSelect}
      />
    </SortFilterContainer>
  )
}

export default FilterSortBar
