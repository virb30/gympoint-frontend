import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

export const ListHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;

  h1 {
    font-size: 24px;
    font-weight: bold;
    color: #444;
  }

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    a {
      background: ${colors.primary};
      border: none;
      border-radius: 4px;
      color: #fff;
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 36px;
      font-weight: bold;
      font-size: 14px;
      padding: 0 10px;
      transition: background 0.2s;

      svg {
        margin-right: 5px;
      }

      &:hover {
        background: ${darken(0.08, colors.primary)};
      }
    }
  }
`;
