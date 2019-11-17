import styled from 'styled-components';
import { darken, lighten } from 'polished';

import colors from '~/styles/colors';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

export const Content = styled.div`
  width: 100%;
  max-width: ${props => props.maxWidth || 1200}px;
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
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  form {
    width: 450px;
    height: 425px;
    display: flex;
    flex-direction: column;
    padding: 10px;

    strong {
      font-size: 14px;
      color: #444;
      flex: 1;
    }

    p {
      flex: 1;
    }

    label {
      font-size: 14px;
      font-weight: bold;
      margin-top: 10px;
      color: #444;
      display: flex;
      flex-direction: column;
      flex: 1;

      textarea {
        border-radius: 4px;
        border: 1px solid #ddd;
        margin: 10px 0;
        font-size: 16px;
        resize: none;
        padding: 10px;
      }

      span {
        color: ${lighten(0.15, colors.danger)};
      }
    }

    button {
      border-radius: 4px;
      color: #fff;
      height: 45px;
      padding: 10px;
      text-align: center;
      transition: background 0.2s;
      border: 0;
      margin-top: 10px;

      &[type='submit'] {
        background: ${colors.primary};

        &:hover {
          background: ${darken(0.05, colors.primary)};
        }

        &:disabled {
          background: ${lighten(0.25, colors.primary)};
          cursor: not-allowed;
        }
      }

      &[type='button'] {
        background: #bbb;
        &:hover {
          background: ${darken(0.05, '#bbb')};
        }
      }
    }
  }
`;
