import styled from 'styled-components';

export const BodyContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  row-gap: 16px;
  grid-template-areas:
    'photoHeader photoHeader photoHeader'
    'text  text .';

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'photoHeader '
      'text ';
  }
`;

export const PhotoAndHeaderContainer = styled.div`
  grid-area: photoHeader;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media only screen and (max-width: 768px) {
    margin: 0px -16px;
  }
`;

export const BigPhoto = styled.div`
  grid-row: 1/2;
  grid-column: 1/-1;
  background-color: black;
`;

export const Header = styled.div`
  margin: 32px;
  grid-column: 1/-1;
  grid-row: 1/-1;
  text-align: right;

  @media only screen and (max-width: 768px) {
    margin: 16px;
  }
`;

export const MainText = styled.div`
  grid-area: text;
  margin: auto 0;
  right: 0;
`;
