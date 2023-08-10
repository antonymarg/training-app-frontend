import styled from 'styled-components';

export const ViewUserContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 7fr;
  justify-self: center;
  gap: 16px;
  row-gap: 8px;
  width: 100%;
  grid-template-areas:
    'profile_picture header'
    'sessions sessions';

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'profile_picture'
      'header'
      'sessions';
    row-gap: 16px;
  }
`;

export const ProfilePicContainer = styled.div`
  grid-area: profile_picture;
  padding: 8px;
  display: grid;
  row-gap: 8px;
  justify-items: center;
`;

export const ProfilePicture = styled.img`
  object-fit: cover;
  background-position: top center;
  border-radius: 50%;
  width: 100%;
  max-width: 250px;
  aspect-ratio: 1 / 1;

  @media only screen and (max-width: 768px) {
    width: 50%;
  }
`;
