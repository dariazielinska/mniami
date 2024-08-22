import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthProvider'

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
  const { currentUser } = useAuth()
  const targetPath = currentUser ? '/recipes' : '/discover'

  return (
    <Link to={targetPath}>
      <LogoContainer>
        <LogoImage />
        <LogoText> MNIAMI </LogoText>
      </LogoContainer>
    </Link>
  )
}

export default Logo
