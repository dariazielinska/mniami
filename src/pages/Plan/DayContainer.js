import styled from '@emotion/styled'

const StyledDayContainer = styled.div`
  margin-bottom: 1rem;
`

const DayTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #555;
`

const DayContainer = ({ title, children }) => (
  <StyledDayContainer>
    <DayTitle>{title}</DayTitle>
    {children}
  </StyledDayContainer>
)

export default DayContainer
