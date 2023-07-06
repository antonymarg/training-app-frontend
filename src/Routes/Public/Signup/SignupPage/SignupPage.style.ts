import styled from 'styled-components';

export const SignupPageContainer = styled.div`
  display: grid;
  grid-template-columns: 7fr 3fr;
  height: 100%;
  padding: 32px 0;
  gap: 24px;
`;

export const HeaderWrapper = styled.div`
  grid-column: 1/2;
  justify-self: center;
  text-align: center;
  display: grid;
  row-gap: 4px;
`;

export const SignupFormContainer = styled.div`
  display: grid;
  grid-column: 1/2;
  grid-template-rows: min-content;
  row-gap: 16px;
  align-items: center;
`;

export const SignupFormDecorator = styled.div`
  grid-column: 2/-1;
  border-left: 1px solid #d3d3d3;
  display: grid;
  align-items: center;
  justify-content: center;
  padding-left: 32px;
`;
