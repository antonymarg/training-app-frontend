import styled from 'styled-components';

export const ViewTrainingPageContainer = styled.div`
  display: grid;
  grid-template-columns: 8fr 2fr;
  gap: 64px;
  grid-template-areas:
    'main-content sidebar'
    'main-content tasks';
  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr min-content;
    gap: 16px;
    grid-template-areas:
      'main-content sidebar'
      'tasks _';
  }
`;
