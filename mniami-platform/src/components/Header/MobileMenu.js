import { NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthProvider'
import styled from '@emotion/styled'
import LogoutButton from './LogoutButton'

const MobileMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100vw;
  top: 70px;
  left: 0;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
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

const MobileMenu = ({ toggleMenu }) => {
  const { currentUser } = useAuth()

  return (
    <MobileMenuContainer>
      {currentUser ? (
        <>
          <MenuLink to="/profile" onClick={toggleMenu}>
            Mój profil
          </MenuLink>
          <MenuLink to="/articles" onClick={toggleMenu}>
            Baza wiedzy
          </MenuLink>
          <MenuLink to="/recipes" onClick={toggleMenu}>
            Przepisy
          </MenuLink>
          <MenuLink to="/plan" onClick={toggleMenu}>
            Plan posiłków
          </MenuLink>
          <MenuLink to="/shopping-list" onClick={toggleMenu}>
            Lista zakupów
          </MenuLink>
          <MenuLink to="/favourites" onClick={toggleMenu}>
            Ulubione
          </MenuLink>
          <LogoutButton />
        </>
      ) : (
        <>
          <MenuLink to="/discover" onClick={toggleMenu}>
            Odkrywaj
          </MenuLink>
          <MenuLink to="/pricing" onClick={toggleMenu}>
            Subskrypcja
          </MenuLink>
          <MenuLink to="/help" onClick={toggleMenu}>
            Pomoc
          </MenuLink>
          <MenuLink to="/auth" onClick={toggleMenu}>
            Załóż konto Zaloguj się
          </MenuLink>
        </>
      )}
    </MobileMenuContainer>
  )
}

export default MobileMenu
