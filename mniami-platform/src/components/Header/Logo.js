import styled from '@emotion/styled'

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`

const LogoImage = styled.div`
  width: 24px;
  height: 24px;
  background-color: #ddd;
`
const LogoText = styled.h1`
  margin: 0 5px;
  color: #454343;
  font-size: 20px;
  font-weight: 500;
`

const Logo = () => {
  return (
    <LogoContainer>
      <LogoImage />
      <LogoText> MNIAMI </LogoText>
    </LogoContainer>
  )
}

export default Logo
