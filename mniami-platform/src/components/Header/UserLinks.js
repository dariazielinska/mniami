import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom'
import LogoutButton from './LogoutButton'
import { useAuth } from '../../contexts/AuthProvider'

const UserLinksContainer = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
  }
`

export const MenuLink = styled(NavLink)`
  text-decoration: none;
  color: #333;
  font-size: 13px;
  margin-right: 12px;

  &.active {
    font-weight: bold;
    border-bottom: 3px solid ${({ theme }) => theme.colors.primary};
  }
`

const UserLinks = () => {
  const { currentUser } = useAuth()

  return (
    <UserLinksContainer>
      {currentUser ? (
        <>
          <MenuLink to="/favourites"> Ulubione </MenuLink>
          <MenuLink to="/profile"> Mój profil </MenuLink>
          <LogoutButton />
        </>
      ) : (
        <>
          <MenuLink to="/auth"> Załóż konto </MenuLink>
          <MenuLink to="/auth"> Zaloguj się </MenuLink>
        </>
      )}
    </UserLinksContainer>
  )
}

export default UserLinks
