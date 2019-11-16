import styled from 'styled-components';

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
  max-width: ${props => props.maxWidth || 1200}px;
`;
