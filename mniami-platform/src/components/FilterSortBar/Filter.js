import styled from '@emotion/styled'
import FilterListIcon from '@mui/icons-material/FilterList'

const Container = styled.div`
  width: 60%;
`

const FilterButton = styled.button`
  padding: 10px 20px;
  background-color: #ddd;
  color: #333;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const Count = styled.span`
  font-size: 1rem;
  color: #a19e9e;
`

const Filter = ({ type }) => {
  const kind = type === 'recipes' ? 'przepisów' : 'artykułów'

  return (
    <Container>
      <FilterButton>
        <FilterListIcon />
        Filtry
      </FilterButton>
      <Count>
        Łącznie {164} wszystkich {kind} w naszej bazie
      </Count>
    </Container>
  )
}

export default Filter
