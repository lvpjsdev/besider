import { FC } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../../app/hooks';
import { menuSlice } from '../store/menuSlice';

const Span = styled.span`
  display: block;
  cursor: pointer;
  text-transform: uppercase;
  font-family: Lato;
  font-weight: 700;
  font-size: 22px;
  line-height: 26.4px;
  letter-spacing: 10%;
  padding: 14px 20px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

export const MenuItem: FC<{ label: string; onClick: () => void }> = ({
  label,
}) => {
  const dispatch = useAppDispatch();

  return (
    <Span
      onClick={() => dispatch(menuSlice.actions.changeCurrentSection(label))}
    >
      {label}
    </Span>
  );
};
