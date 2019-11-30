import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export const Container = styled.ul`
  margin-bottom: auto;
  background: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #ddd;
  padding: 10px;
`;

export const Page = styled.li`
  button {
    background: ${props => (props.active ? colors.primary : '#fff')};
    color: ${props => (props.active ? '#ddd' : colors.primary)};
    border: 1px solid #999;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;

    font-size: 14px;

    margin-left: 5px;
    margin-right: 5px;

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      background: ${darken(0.08, '#fff')};
      color: ${colors.primary};
    }
  }
`;
