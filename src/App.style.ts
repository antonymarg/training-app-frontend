import styled from 'styled-components';

export const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.palette.background.default};
`;

export const LayoutContainer = styled.div`
  padding: 16px 10%;
  height: 100%;

  @media only screen and (max-width: 768px) {
    padding: 16px;
  }
`;
