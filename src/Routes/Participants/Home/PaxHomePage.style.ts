import styled from 'styled-components';

export const PaxHomePageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto;
  grid-template-areas: 'trainings trainings trainings . profile profile';

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
    grid-template-areas:
      'profile'
      'trainings';
  }
`;

export const TrainingsContainer = styled.div`
  grid-area: trainings;
`;

export const ProfileContainer = styled.div`
  grid-area: profile;
`;
