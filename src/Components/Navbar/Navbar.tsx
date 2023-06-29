import { Typography } from '@mui/material';
import { Menu } from '../Menu/Menu';
import { StyledNav } from './navbar.style';

export function Navbar() {
  return (
    <StyledNav>
      <Typography variant="h6">Training app</Typography>
      <Menu />
    </StyledNav>
  );
}