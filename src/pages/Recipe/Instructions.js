import styled from '@emotion/styled'

const InstructionsContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`

const InstructionsTitle = styled.h3`
  margin: 20px 0 9px 0;
  font-size: 20px;
  font-weight: 500;
`

const InstructionsList = styled.ol`
  font-size: 18px;
  padding-inline-start: 25px;
`

const InstructionItem = styled.li`
  margin: 10px 0;
`

const Instructions = ({ instructions }) => {
  if (!instructions || instructions.length === 0) {
    return <p>Wystąpił błąd</p>
  }

  return (
    <InstructionsContainer>
      <InstructionsTitle>Jak przygotować</InstructionsTitle>
      <InstructionsList>
        {instructions.map((step, index) => (
          <InstructionItem key={index}>{step}</InstructionItem>
        ))}
      </InstructionsList>
    </InstructionsContainer>
  )
}

export default Instructions
