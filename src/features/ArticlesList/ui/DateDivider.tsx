import { FC } from 'react';
import { styled } from 'styled-components';

interface Props {
  date: string | number;
}

const StyledP = styled.p`
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
  margin: 32px 0;
  text-align: start;
`;

export const DateDivider: FC<Props> = ({ date }) => {
  const dateStr = new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  return <StyledP>{`News for ${dateStr}`}</StyledP>;
};
