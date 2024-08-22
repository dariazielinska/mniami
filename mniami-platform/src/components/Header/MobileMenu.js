import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthProvider'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

const MobileMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100vw;
  top: 50px;
  left: 0;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  a {
    text-decoration: none;
    color: #007bff;
    font-size: 16px;
    margin-bottom: 10px;
  }
`

const MobileMenu = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (e) {
      console.error('Failed to log out', e)
    }
  }

  return (
    <MobileMenuContainer>
      {currentUser ? (
        <>
          <Link to="/articles"> Baza wiedzy </Link>
          <Link to="/recipes"> Przepisy </Link>
          <Link to="/plan"> Plan posiłków </Link>
          <Link to="/shopping-list"> Lista zakupów </Link>
          <Link to="/favourites"> Ulubione </Link>
          <Link to="/profile"> Mój profil </Link>
          <button onClick={handleLogout}>Wyloguj</button>
        </>
      ) : (
        <>
          <Link to="/discover"> Odkrywaj </Link>
          <Link to="/pricing"> Subskrypcja </Link>
          <Link to="/help"> Pomoc </Link>
          <Link to="/auth"> Załóż konto </Link>
          <Link to="/auth"> Zaloguj się </Link>
        </>
      )}
    </MobileMenuContainer>
  )
}

export default MobileMenu
