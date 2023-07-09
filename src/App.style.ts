import styled from 'styled-components';

export const AppContainer = styled.div`
  width: 100%vw;
  height: 100%vh;
  background-color: ${(props) => props.theme.palette.background.default};
`;

export const LayoutContainer = styled.div`
  padding: 0px 10%;

  @media only screen and (max-width: 768px) {
    padding: 0px 16px;
  }
`;
