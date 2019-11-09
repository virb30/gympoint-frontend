import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.div`
  background: #fff;
  border-radius: 4px;
  max-width: 360px;
  padding: 50px 30px;
  box-shadow: 0px 1px 4px #979797;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    max-height: 100px;
    margin-bottom: 15px;
  }

  form {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;

    label {
      font-weight: bold;
      display: flex;
      flex-direction: column;
      font-size: 14px;
      margin: 10px 0;
      width: 100%;

      input {
        margin: 10px 0;
        height: 45px;
        outline: 0;
        border-radius: 4px;
        border: 1px solid #ddd;
        padding: 13px;
      }

      span {
        font-weight: 500;
        color: ${lighten(0.06, '#ee4d64')};
      }
    }

    button {
      background: #ee4d64;
      border-radius: 4px;
      height: 45px;
      width: 100%;
      border: none;
      color: #fff;
      font-weight: bold;
      font-size: 16px;
      margin-top: auto;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, '#ee4d64')};
      }
    }
  }
`;
