import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export const Container = styled.div`
  background: #fff;
  padding: 0 20px;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  height: 64px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    flex-direction: row;
    align-items: center;

    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding-right: 15px;
      margin-right: 15px;
      border-right: 1px solid #ddd;

      img {
        margin-right: 10px;
      }

      span {
        color: ${colors.primary};
        font-weight: bold;
        font-size: 15px;
      }
    }

    a {
      color: #999;
      font-weight: bold;
      text-decoration: none;
      font-size: 15px;
      margin: 0 10px;

      &:hover {
        color: ${darken(0.2, '#999')};
      }

      &.active {
        color: ${darken(0.3, '#999')};
      }
    }
  }

  aside {
    display: flex;
    align-items: center;

    div {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      strong {
        font-weight: bold;
        font-size: 14px;
      }

      button {
        background: none;
        color: ${colors.danger};
        border: none;
        font-size: 14px;
      }
    }
  }
`;
