import { useState } from 'react'
import styled from '@emotion/styled'
import Logo from './Logo'
import Navigation from './Navigation'
import UserLinks from './UserLinks'
import MobileMenu from './MobileMenu'
import MenuIcon from '@mui/icons-material/Menu'

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  padding: 15px;
  max-width: 100vw;
  justify-content: space-between;

  @media (min-width: 768px) {
    padding: 10px 20px;
  }
`

const HamburgerButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  font-size: 19px;
  font-weight: 500;
  cursor: pointer;
  color: #333;

  @media (min-width: 768px) {
    display: none;
  }
`

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <HeaderContainer>
      <Logo />
      <HamburgerButton onClick={toggleMenu}>
        Menu <MenuIcon />
      </HamburgerButton>
      {isMenuOpen && <MobileMenu />}
      <Navigation />
      <UserLinks />
    </HeaderContainer>
  )
}

export default Header
