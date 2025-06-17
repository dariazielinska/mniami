import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthProvider'
import MniamiLogo from '../../assets/mniami-logo.svg'

const LogoImage = styled.img`
  width: 136px;
  height: 45px;
`

const Logo = () => {
  const { currentUser } = useAuth()
  const targetPath = currentUser ? '/recipes' : '/discover'

  return (
    <Link to={targetPath}>
      <LogoImage src={MniamiLogo} alt="Mniami Logo" />
    </Link>
  )
}

export default Logo
