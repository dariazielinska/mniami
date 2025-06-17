import styled from '@emotion/styled'
import { useAuth } from '../../contexts/AuthProvider'
import { NavLink } from 'react-router-dom'

const NavigationContainer = styled.nav`
  display: none;

  @media (min-width: 768px) {
    flex: 1;
    display: flex;
    justify-content: center;
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

const Navigation = () => {
  const { currentUser } = useAuth()
  return (
    <NavigationContainer>
      {currentUser ? (
        <div>
          <MenuLink to="/articles"> Baza wiedzy </MenuLink>
          <MenuLink to="/recipes"> Przepisy </MenuLink>
          <MenuLink to="/plan"> Plan posiłków </MenuLink>
          <MenuLink to="/shopping-list"> Lista zakupów </MenuLink>
        </div>
      ) : (
        <div>
          <MenuLink to="/discover"> Odkrywaj </MenuLink>
          <MenuLink to="/pricing"> Subskrypcja </MenuLink>
          <MenuLink to="/help"> Pomoc </MenuLink>
        </div>
      )}
    </NavigationContainer>
  )
}

export default Navigation
