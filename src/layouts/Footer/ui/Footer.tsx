import styled from 'styled-components';
import logoImg from '../../../assets/news_api_logo.png';

const StyledFooter = styled.footer`
  height: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 30px 60px;

  font-weight: 400;
  font-size: 12px;
`;

const StyledNav = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;

  & a {
    font-family: Lato;
    font-weight: 400;
    font-size: 12px;
    line-height: 14.4px;
    text-decoration: none;
    color: rgba(0, 0, 0, 1);
  }
`;

const StyledLogoSection = styled.section`
  height: 47px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const Footer = () => {
  return (
    <StyledFooter>
      <StyledNav>
        <a href="#">Log In</a>
        <a href="#">About Us</a>
        <a href="#">Publishers</a>
        <a href="#">Sitemap</a>
      </StyledNav>
      <StyledLogoSection>
        <span>Powered by</span>
        <img src={logoImg} width={84} height={25}></img>
      </StyledLogoSection>
      <span>© 2023 Besider. Inspired by Insider</span>
    </StyledFooter>
  );
};
