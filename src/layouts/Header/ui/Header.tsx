import { FC } from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 21px 0;
  border-bottom: 1px solid rgba(237, 237, 237, 1);
`;

const StyledH1 = styled.h1`
  font-weight: 700;
  font-size: 24px;
  line-height: 28.8px;
  letter-spacing: 10%;
  text-align: center;
  text-transform: uppercase;
  margin: 0;
`;

export const Header: FC = () => (
  <StyledHeader>
    <StyledH1>Besider</StyledH1>
  </StyledHeader>
);
