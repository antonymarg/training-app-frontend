import styled from 'styled-components';

export const TrainingsContainer = styled.div`
  border: 3px solid ${(props) => props.theme.palette.primary.main};
  border-radius: 10px;
`;

export const TrainingsHeader = styled.div`
  background-color: ${(props) => props.theme.palette.primary.main};
  padding: 8px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas: 'text . button';
  align-items: center;
`;
