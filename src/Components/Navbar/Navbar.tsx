import { Link, Typography } from '@mui/material';
import { Menu } from '../Menu/Menu';
import { StyledNav } from './navbar.style';
import { useSelector } from 'react-redux';
import { getUser } from '../../Models/User/selectors';

export function Navbar() {
  const user = useSelector(getUser);
  if (window.location.pathname === '/' && !user.isLoggedIn) return null;
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
