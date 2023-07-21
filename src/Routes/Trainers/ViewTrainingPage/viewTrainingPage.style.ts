import styled from 'styled-components';

export const ViewTrainingPageContainer = styled.div`
  display: grid;
  padding: 32px 0;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-template-areas:
    'navigate . . . '
    'title title . .'
    'details details details details'
    'trainers-box trainers-box pax-box pax-box'
    'announcements announcements announcements announcements';
  gap: 16px;
  row-gap: 16px;
  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0;
    grid-template-areas:
      'navigate'
      'title'
      'details'
      'trainers-box'
      'pax-box'
      'announcements';
  }
`;

export const NavigatorContainer = styled.div`
  grid-area: navigate;
`;

export const TitleContainer = styled.div`
  grid-area: title;
`;
export const DetailsContainer = styled.div`
  grid-area: details;
`;
export const TrainersBoxContainer = styled.div`
  grid-area: trainers-box;
  display: grid;
  grid-template-rows: min-content;
  gap: 8px;
  text-align: center;
`;
export const ParticipantsBoxContainer = styled.div`
  grid-area: pax-box;
  display: grid;
  gap: 8px;
  text-align: center;
`;
export const AnnouncementsContainer = styled.div`
  grid-area: announcements;
`;
