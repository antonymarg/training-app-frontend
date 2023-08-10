import styled from 'styled-components';
import { Divider } from '@mui/material';

export const EmailCollectionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-self: center;
  row-gap: 16px;
  padding: 16px;
  width: 100%;
  max-width: 400px;
`;

export const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 8px;
`;

export const StyledDivider = styled(Divider)`
  align-items: flex-start;
`;
