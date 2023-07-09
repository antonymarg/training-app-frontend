import styled from 'styled-components';
import { DialogTitle, Divider } from '@mui/material';

export const LoginPageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 16px;
  padding: 16px;
  min-width: 400px;

  @media only screen and (max-width: 768px) {
    min-width: unset;
  }
`;

export const EmailAndPassContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 8px;
`;

export const StyledDialogTitle = styled(DialogTitle)`
  background-color: ${({ theme }) => theme.palette.secondary.main};
  color: ${({ theme }) => theme.palette.primary.main};
`;

export const StyledDivider = styled(Divider)`
  align-items: flex-start;
`;
