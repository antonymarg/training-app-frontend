import styled from 'styled-components';

export const ViewTrainingPageContainer = styled.div`
  display: grid;
  grid-template-columns: 8fr 2fr;
  grid-template-rows: fit-content;
  gap: 64px;
  grid-template-areas: 'trainingInfo sidebar';

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: fit-content;
    gap: 16px;
    grid-template-areas:
      'sidebar'
      'trainingInfo';
  }
`;

export const TrainingInfoContainer = styled.div`
  grid-area: trainingInfo;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-template-areas:
    'title title . .'
    'details details details details'
    'present present present present'
    'trainers-box trainers-box pax-box pax-box'
    'announcements announcements announcements announcements';
  gap: 16px;
  row-gap: 16px;
  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0;
    grid-template-areas:
      'title'
      'details'
      'present'
      'trainers-box'
      'pax-box'
      'announcements';
  }
`;

export const TitleContainer = styled.div`
  grid-area: title;
`;
export const DetailsContainer = styled.div`
  grid-area: details;
`;

export const UsersBoxContainer = styled.div`
  grid-area: trainers-box;
  display: grid;
  grid-template-rows: min-content;
  gap: 16px;
`;
export const AnnouncementsContainer = styled.div`
  grid-area: announcements;
  display: grid;
  gap: 8px;
`;

export const SidebarContainer = styled.div`
  grid-area: sidebar;
`;
