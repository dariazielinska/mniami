import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom'

const CallToActionButton = styled(NavLink)`
  padding: 10px 40px;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  border: 1px solid transparent;
  border-radius: 10px;
  text-decoration: none;
  color: #333;
  text-align: center;
  cursor: pointer;
`

export default CallToActionButton
