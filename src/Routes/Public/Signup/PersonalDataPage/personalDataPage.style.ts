import styled from 'styled-components';

export const PersonalDataContainer = styled.div`
  display: grid;
  grid-template-columns: 30fr 70fr;
  justify-self: center;
  gap: 16px;
  row-gap: 8px;
  width: 100%;
`;

export const ProfilePicContainer = styled.div`
  padding: 8px;
  display: grid;
  justify-items: center;
`;

export const MainFormContainer = styled.div`
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
