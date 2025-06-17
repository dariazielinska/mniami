import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import styled from '@emotion/styled'

const BackButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #333;
  position: absolute;
  top: 10px;
  left: 10px;
  content: '';

  &:hover {
    color: #007bff;
  }

  svg {
    margin-right: 8px;
  }

  @media (min-width: 768px) {
    top: 20px;
  }
`

function BackArrow() {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <BackButton onClick={handleGoBack}>
      <ArrowBackIcon /> Powrót
    </BackButton>
  )
}

export default BackArrow
