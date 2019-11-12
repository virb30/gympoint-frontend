import styled from 'styled-components';
import colors from '~/styles/colors';

export const Container = styled.div`
  background: #fff;
  width: 100%;
  border-radius: 4px;
  padding: 10px 20px;

  table {
    width: 100%;
    border-collapse: collapse;

    thead tr {
      th {
        padding: 10px 0;
        color: #444;
        font-weight: bold;
        font-size: 16px;
      }
    }

    tbody tr {
      & + tr {
        border-top: 1px solid #eee;
      }

      td {
        padding: 15px 0;
        line-height: 20px;
        color: #666;
        font-size: 16px;
      }
    }
  }
`;

export const Td = styled.td`
  text-align: ${props => props.align};

  div {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 0 10px;

    button {
      background: none;
      color: ${colors.danger};
      font-size: 15px;
      border: 0;
      margin-left: 10px;
    }

    a {
      color: ${colors.info};
      text-decoration: none;
      font-size: 15px;
    }
  }
`;

export const Th = styled.th`
  text-align: ${props => props.align};
`;
