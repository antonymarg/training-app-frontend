import { useState } from 'react';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import { StyledMenu } from './menu.style';
import { LoginModal } from '../LoginModal/LoginModal';
import { useSelector } from 'react-redux';
import { getUser } from '../../Models/User/selectors';
import User from '../../Assets/img/user.png';
import { NotificationsMenu } from '../NotificationsMenu/NotificationMenu';

export function Menu() {
  const user = useSelector(getUser);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const handleClickOpenLoginModal = () => setLoginModalOpen(true);
  const handleClickCloseLoginModal = () => setLoginModalOpen(false);
  const isMobile = window.innerWidth < 768;

  const showStartButton =
    !user.isLoggedIn && !window.location.href.includes('signup');

  return (
    <StyledMenu>
      {user.isLoggedIn && (
        <Stack direction="row" spacing={2} alignItems="center">
          {!isMobile && (
            <div>
              <Avatar src={user.profile?.imgSrc || User} />
              <Typography color="secondary">
                Hello {user.profile?.name}
              </Typography>
            </div>
          )}
          <NotificationsMenu />
        </Stack>
      )}
      {showStartButton && (
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleClickOpenLoginModal}
        >
          Start
        </Button>
      )}
      <LoginModal
        open={isLoginModalOpen}
        onClose={handleClickCloseLoginModal}
      />
    </StyledMenu>
  );
}
