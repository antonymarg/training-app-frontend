import { Link, Typography } from '@mui/material';
import { Menu } from '../Menu/Menu';
import { StyledNav } from './navbar.style';

export function Navbar() {
  return (
    <StyledNav>
      <Link href="/">
        <Typography variant="h5" color="secondary">
          Training app
        </Typography>
      </Link>
      <Menu />
    </StyledNav>
  );
}
