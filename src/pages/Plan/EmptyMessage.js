import styled from '@emotion/styled'

const StyledEmptyMessage = styled.p`
  text-align: center;
  color: #666;
  font-size: 1.2rem;
`

const EmptyMessage = ({ message = 'Brak dostępnych planów posiłków.' }) => (
  <StyledEmptyMessage>{message}</StyledEmptyMessage>
)

export default EmptyMessage
