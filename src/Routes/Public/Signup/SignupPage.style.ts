import styled from 'styled-components';

export const SignupPageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: min-content;
  height: 100%;
  padding: 16px 0;
  gap: 16px;
  row-gap: 32px;
`;

export const HeaderWrapper = styled.div`
  grid-column: 1/-1;
`;

export const SignupFormContainer = styled.div`
  display: grid;
  grid-column: 1/5;
  grid-template-rows: min-content;
  row-gap: 16px;
  align-items: center;
`;

export const SignupFormDecorator = styled.div`
  grid-column: 5/-1;
  border-left: 1px solid gray;
  display: grid;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;
