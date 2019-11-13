import styled from 'styled-components';
import { darken, lighten } from 'polished';

import colors from '~/styles/colors';

const Content = styled.div`
  width: 100%;
  max-width: 900px;
  align-self: center;

  header {
    display: flex;
    flex-direction: row;
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
        background: #bbb;
        color: #fff;
        display: flex;
        flex-direction: row;
        padding: 10px;
        border: 0;
        border-radius: 4px;
        height: 36px;
        align-items: center;
        font-weight: bold;
        font-size: 14px;
        margin-right: 15px;
        transition: background 0.2s;

        &:hover {
          background: ${darken(0.05, '#bbb')};
        }

        svg {
          margin-right: 5px;
        }
      }

      button {
        background: ${colors.primary};
        color: #fff;
        font-size: 14px;
        font-weight: bold;
        border-radius: 4px;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 10px;
        height: 36px;
        transition: background 0.2s;

        &:hover {
          background: ${darken(0.05, colors.primary)};
        }

        svg {
          margin-right: 10px;
        }
      }
    }
  }

  form {
    background: #fff;
    border-radius: 4px;
    padding: 10px;
    display: flex;
    flex-direction: column;

    div {
      display: flex;
      flex-direction: row;
      padding: 5px;

      label {
        display: flex;
        flex-direction: column;
        font-weight: bold;
        color: #444;
        padding: 5px;
        font-size: 14px;
        flex: 1;

        input {
          border-radius: 4px;
          border: 1px solid #ddd;
          height: 45px;
          margin-top: 8px;
          font-size: 16px;
          padding: 10px;
        }

        span {
          margin-top: 5px;
          color: ${lighten(0.15, colors.danger)};
        }
      }
    }
  }
`;

export default Content;
