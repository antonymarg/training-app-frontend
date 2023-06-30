import styled from 'styled-components';

export const SignupPageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  height: 600px;
  padding: 16px 0;
`;

export const SignupFormContainer = styled.div`
  grid-column: 1/5;
  display: grid;
  grid-template-rows: min-content;
  align-items: center;
  padding-right: 16px;
`;

export const SignupFormDecorator = styled.div`
  grid-column: 5/-1;
  border-left: 1px solid gray;
`;
