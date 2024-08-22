import { useAuth } from '../../contexts/AuthProvider'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

const Button = styled.button`
  border: none;
  background-color: #fff;
  color: #333;
  font-size: 13px;
  padding-right: 0;
  font-weight: 200;
`

const LogoutButton = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (e) {
      console.error('Failed to log out', e)
    }
  }

  return <Button onClick={handleLogout}> Wyloguj się </Button>
}

export default LogoutButton
