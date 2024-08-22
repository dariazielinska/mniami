import styled from '@emotion/styled'
import { useAuth } from '../../contexts/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const UserLinksContainer = styled.div`
  display: flex;
  gap: 10px;

  a {
    text-decoration: none;
    color: #007bff;
    font-size: 16px;
  }
`

const UserLinks = () => {
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
    <UserLinksContainer>
      {currentUser ? (
        <div>
          <Link to="/favourites"> Ulubione </Link>
          <Link to="/profile"> Mój profil </Link>
          <button onClick={handleLogout}>Wyloguj</button>
        </div>
      ) : (
        <div>
          <Link to="/auth"> Załóż konto </Link>
          <Link to="/auth"> Zaloguj się </Link>
        </div>
      )}
    </UserLinksContainer>
  )
}

export default UserLinks
