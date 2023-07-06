import styled from 'styled-components';

export const CreateProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 7fr;
  justify-self: center;
  gap: 16px;
  row-gap: 8px;
  width: 100%;
  grid-template-areas:
    'profile_picture form'
    '. button_container';
`;

export const ProfilePicContainer = styled.div`
  grid-area: profile_picture;
  padding: 8px;
  display: grid;
  row-gap: 8px;
  justify-items: center;
`;

export const MainFormContainer = styled.div`
  grid-area: form;
  display: grid;
  row-gap: 8px;
`;

export const ProfilePicture = styled.img`
  object-fit: cover;
  background-position: top center;
  border-radius: 50%;
  width: 100%;
  max-width: 250px;
  aspect-ratio: 1 / 1;
`;

export const ButtonContainer = styled.div`
  grid-area: button_container;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-areas: '. button';
  margin-top: 8px;
`;
