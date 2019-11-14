import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 900px;
  align-self: center;

  header {
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
  }
`;

export const InputGroup = styled.div`
  padding: 0;
  border-radius: 4px;
  border: 1px solid #ddd;
  height: 36px;
  background: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 15px;

  input {
    border: none;
    background: none;
    padding-right: 10px;
    padding-left: 5px;
  }

  svg {
    margin: 0 5px 0 10px;
  }
`;
