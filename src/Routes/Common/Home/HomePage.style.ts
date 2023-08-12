import styled from 'styled-components';

export const LoginFormContainer = styled.div`
  grid-area: 'login-form';
  width: 30%;
  margin-left: auto;
  display: grid;
  row-gap: 8px;
  @media only screen and (max-width: 768px) {
    width: 100%;
    min-width: unset;
  }
`;

export const TextWithPhoto = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-areas: 'text photo';
  align-items: center;
  gap: 16px;
  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas: 'text' 'photo';
  }
`;

export const TextWithPhotoRev = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-areas: 'photo text';
  align-items: center;
  gap: 16px;
  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas: 'text' 'photo';
  }
`;
