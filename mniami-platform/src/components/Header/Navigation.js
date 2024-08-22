import styled from '@emotion/styled'
import { useAuth } from '../../contexts/AuthProvider'
import { Link } from 'react-router-dom'

const NavigationContainer = styled.nav`
  display: flex;
  gap: 15px;

  a {
    text-decoration: none;
    color: #333;
    font-size: 18px;
  }
`

const Navigation = () => {
  const { currentUser } = useAuth()
  return (
    <NavigationContainer>
      {currentUser ? (
        <div>
          <Link to="/articles"> Baza wiedzy </Link>
          <Link to="/recipes"> Przepisy </Link>
          <Link to="/plan"> Plan posiłków </Link>
          <Link to="/shopping-list"> Lista zakupów </Link>
        </div>
      ) : (
        <div>
          <Link to="/discover"> Odkrywaj </Link>
          <Link to="/pricing"> Subskrypcja </Link>
          <Link to="/help"> Pomoc </Link>
        </div>
      )}
    </NavigationContainer>
  )
}

export default Navigation
