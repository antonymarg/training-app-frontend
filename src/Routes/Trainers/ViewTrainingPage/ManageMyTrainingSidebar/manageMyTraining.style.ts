import styled from 'styled-components';
import { grey } from '@mui/material/colors';

export const ManageContainer = styled.div`
  grid-area: sidebar;
  border-radius: 20px;
  border: 1px solid ${grey[300]};
  padding: 16px;
  display: grid;
  gap: 8px;
  height: fit-content;
`;
