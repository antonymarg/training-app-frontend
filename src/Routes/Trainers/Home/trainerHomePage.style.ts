import styled from 'styled-components';

export const TrainerHopePageContainer = styled.div`
  display: grid;
  padding: 16px 0px;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto;
  grid-template-areas: 'trainings trainings trainings . profile profile';
`;

export const TrainingsContainer = styled.div`
  grid-area: trainings;
`;

export const ProfileContainer = styled.div`
  grid-area: profile;
`;
