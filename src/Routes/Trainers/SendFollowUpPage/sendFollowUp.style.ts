import styled from 'styled-components';

export const SendFollowUpContainer = styled.div`
  display: grid;
  gap: 16px;
  grid-template-areas:
    'form form form'
    '. . button';
  @media only screen and (max-width: 768px) {
    grid-template-areas:
      'form form form'
      'button button button';
  }
`;
