import { Avatar, Stack, Typography, useMediaQuery } from '@mui/material';
import { StyledMenu } from './menu.style';
import { useSelector } from 'react-redux';
import { getUser } from '../../Models/User/selectors';
import User from '../../Assets/img/user.png';
import { NotificationsMenu } from '../NotificationsMenu/NotificationMenu';

export function Menu() {
  const user = useSelector(getUser);
  const isMobile = useMediaQuery('@media only screen and (max-width: 768px)');

  return (
    <StyledMenu>
      {user.isLoggedIn && (
        <Stack direction="row" spacing={2} alignItems="center">
          {!isMobile && (
            <Stack direction="row" alignItems="center" spacing={1}>
              <Avatar src={user.profile?.imgSrc || User} />
              <Typography color="secondary">
                Hello {user.profile?.name}
              </Typography>
            </Stack>
          )}
          <NotificationsMenu />
        </Stack>
      )}
    </StyledMenu>
  );
}
