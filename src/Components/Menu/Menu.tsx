import { useState } from 'react';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import { StyledMenu } from './menu.style';
import { LoginModal } from '../LoginModal/LoginModal';
import { useSelector } from 'react-redux';
import { getUser } from '../../Models/User/selectors';
import User from '../../Assets/img/user.png';

export function Menu() {
  const user = useSelector(getUser);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const handleClickOpenLoginModal = () => setLoginModalOpen(true);
  const handleClickCloseLoginModal = () => setLoginModalOpen(false);

  const showStartButton = !window.location.href.includes('signup');

  return (
    <StyledMenu>
      {user.isLoggedIn ? (
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src={user.profile?.imgSrc || User} />
          <Typography color="secondary">Hello {user.profile?.name}</Typography>
        </Stack>
      ) : showStartButton ? (
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleClickOpenLoginModal}
        >
          Start
        </Button>
      ) : null}
      <LoginModal
        open={isLoginModalOpen}
        onClose={handleClickCloseLoginModal}
      />
    </StyledMenu>
  );
}
