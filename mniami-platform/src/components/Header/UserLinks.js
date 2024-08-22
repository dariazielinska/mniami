import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'
import { useAuth } from '../../contexts/AuthProvider'

const UserLinksContainer = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;

    a {
      text-decoration: none;
      color: #333;
      font-size: 13px;
      padding-right: 12px;
    }
  }
`

const UserLinks = () => {
  const { currentUser } = useAuth()

  return (
    <UserLinksContainer>
      {currentUser ? (
        <>
          <Link to="/favourites"> Ulubione </Link>
          <Link to="/profile"> Mój profil </Link>
          <LogoutButton />
        </>
      ) : (
        <>
          <Link to="/auth"> Załóż konto </Link>
          <Link to="/auth"> Zaloguj się </Link>
        </>
      )}
    </UserLinksContainer>
  )
}

export default UserLinks
