import styled from 'styled-components';

export const BodyContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 200px;
  row-gap: 16px;
  grid-template-areas:
    'photoHeader photoHeader photoHeader'
    'photoHeader photoHeader photoHeader'
    'text  text .';
`;

export const PhotoAndHeaderContainer = styled.div`
  grid-area: photoHeader;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export const BigPhoto = styled.div`
  grid-row: 1/2;
  grid-column: 1/-1;

  background-color: black;
`;

export const Header = styled.div`
  grid-column: 2/-1;
  grid-row: 1/2;
  margin-right: 32px;
  text-align: right;
  align-self: center;
`;

export const MainText = styled.div`
  grid-area: text;
  margin: auto 0;
  right: 0;
`;
