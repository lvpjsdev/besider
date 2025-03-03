import { FC } from 'react';
import { styled } from 'styled-components';

export const convertDate = (dateStr: string) => {
  return dateStr.split('T')[0].split('-').reverse().join('.');
};

interface Props {
  date: string;
}

const StyledP = styled.p`
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
  margin: 32px 0;
  text-align: start;
`;

export const DateDivider: FC<Props> = ({ date }) => {
  return <StyledP>{`News for ${convertDate(date)}`}</StyledP>;
};
