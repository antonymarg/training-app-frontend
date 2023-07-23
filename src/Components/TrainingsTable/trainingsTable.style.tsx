import styled from 'styled-components';

export const TrainingsHeader = styled.div`
  background-color: ${(props) => props.theme.palette.primary.main};
  padding: 16px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas: 'text . button';
  align-items: center;
`;
