import styled from 'styled-components';
import { CircularProgress } from '@mui/material';

const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function FullBodyLoader() {
  return (
    <LoaderContainer>
      <CircularProgress color="secondary" size={100} />
    </LoaderContainer>
  );
}
