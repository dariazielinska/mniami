import styled from '@emotion/styled'

const FooterContainer = styled.footer`
  background-color: #333;
  color: white;
  padding: 20px 0;
`

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  width: 90%;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Układ na mniejszych ekranach */
  }
`

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const FooterLink = styled.a`
  color: white;
  text-decoration: none;
  margin-bottom: 8px;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-top: 1px solid #444;
  max-width: 1200px;
  margin: 0 auto;
`

const FooterBottomLinks = styled.div`
  display: flex;
  gap: 15px;
`

const FooterBottomLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`

const Copyright = styled.p`
  color: white;
  font-size: 14px;
`

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <h4>Mniami</h4>
          <FooterLink href="#">O nas</FooterLink>
          <FooterLink href="#">Jak to działa</FooterLink>
          <FooterLink href="#">Sposoby płatności</FooterLink>
        </FooterColumn>
        <FooterColumn>
          <h4>Współpraca</h4>
          <FooterLink href="#">Kariera</FooterLink>
          <FooterLink href="#">Program partnerski</FooterLink>
          <FooterLink href="#">Centrum prasowe</FooterLink>
        </FooterColumn>
        <FooterColumn>
          <h4>Kontakt</h4>
          <FooterLink href="#">+48 517238093</FooterLink>
          <FooterLink href="#">biuro@mniami.pl</FooterLink>
          <FooterLink href="#">pn - pt 09.00-16.00</FooterLink>
          <FooterLink href="#">Najczęściej zadawane pytania</FooterLink>
        </FooterColumn>
      </FooterContent>

      <FooterBottom>
        <FooterBottomLinks>
          <FooterBottomLink href="#">Polityka prywatności</FooterBottomLink>
          <FooterBottomLink href="#">Regulamin</FooterBottomLink>
          <FooterBottomLink href="#">Kontakt</FooterBottomLink>
        </FooterBottomLinks>
        <Copyright>Firma 2024</Copyright>
      </FooterBottom>
    </FooterContainer>
  )
}

export default Footer
