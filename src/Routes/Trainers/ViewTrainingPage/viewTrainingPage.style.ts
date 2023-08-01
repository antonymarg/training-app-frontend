import { grey } from '@mui/material/colors';
import styled from 'styled-components';

export const ViewTrainingPageContainer = styled.div`
  display: grid;
  padding: 32px 0;
  grid-template-columns: 8fr 2fr;
  grid-template-rows: fit-content;
  gap: 32px;
  grid-template-areas:
    'navigate navigate'
    'trainingInfo sidebar';

  @media only screen and (max-width: 768px) {
    padding: 0px;
    grid-template-columns: 1fr;
    grid-template-rows: fit-content;
    gap: 16px;
    grid-template-areas:
      'navigate'
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

export const ManageYourTrainingBar = styled.div`
  grid-area: sidebar;
  border-radius: 20px;
  border: 1px solid ${grey[300]};
  padding: 16px;
  display: grid;
  gap: 8px;
  height: fit-content;
`;

export const NavigatorContainer = styled.div`
  grid-area: navigate;
  display: grid;
  grid-template-columns: min-content 1fr max-content;
  grid-template-areas: 'navigation . accept';
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
