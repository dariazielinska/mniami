import styled from '@emotion/styled'

export const Container = styled.div`
  padding: 10px;
  font-size: 14px;

  @media (min-width: 768px) {
    padding: 20px;
    font-size: 16px;
  }

  @media (min-width: 1024px) {
    padding: 30px;
    font-size: 18px;
  }
`

export const Title = styled.p`
  color: #333;
  margin-bottom: 20px;
`
