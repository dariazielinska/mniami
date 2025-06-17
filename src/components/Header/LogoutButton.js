import { useAuth } from '../../contexts/AuthProvider'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

const Button = styled.button`
  border: none;
  background-color: #fff;
  color: #333;
  font-size: 16px;
  margin-bottom: 10px;
  padding: 10px 20px;
  border-bottom: 1px solid #dfdfdf;
  text-align: left;

  @media (min-width: 768px) {
    padding-right: 0;
    font-size: 13px;
    margin-bottom: 0;
    padding: 0;
    border-bottom: none;
    text-align: center;
  }
`

const LogoutButton = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/discover')
    } catch (e) {
      console.error('Failed to log out', e)
    }
  }

  return <Button onClick={handleLogout}> Wyloguj się </Button>
}

export default LogoutButton
