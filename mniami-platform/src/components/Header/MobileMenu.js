import { NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthProvider'
import styled from '@emotion/styled'
import LogoutButton from './LogoutButton'

const MobileMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100vw;
  top: 65px;
  left: 0;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding-top: 20px;
`

export const MenuLink = styled(NavLink)`
  text-decoration: none;
  color: #333;
  font-size: 16px;
  padding: 10px 20px;
  border-bottom: 1px solid #dfdfdf;

  &.active {
    font-weight: bold;
    border-left: 3px solid ${({ theme }) => theme.colors.primary};
  }
`

const MobileMenu = () => {
  const { currentUser } = useAuth()

  return (
    <MobileMenuContainer>
      {currentUser ? (
        <>
          <MenuLink to="/profile"> Mój profil </MenuLink>
          <MenuLink to="/articles"> Baza wiedzy </MenuLink>
          <MenuLink to="/recipes"> Przepisy </MenuLink>
          <MenuLink to="/plan"> Plan posiłków </MenuLink>
          <MenuLink to="/shopping-list"> Lista zakupów </MenuLink>
          <MenuLink to="/favourites"> Ulubione </MenuLink>
          <LogoutButton />
        </>
      ) : (
        <>
          <MenuLink to="/discover"> Odkrywaj </MenuLink>
          <MenuLink to="/pricing"> Subskrypcja </MenuLink>
          <MenuLink to="/help"> Pomoc </MenuLink>
          <MenuLink to="/auth"> Załóż konto Zaloguj się </MenuLink>
        </>
      )}
    </MobileMenuContainer>
  )
}

export default MobileMenu
