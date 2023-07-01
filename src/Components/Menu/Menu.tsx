import { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { StyledMenu } from './menu.style';
import { LoginModal } from '../LoginModal/LoginModal';
import { useSelector } from 'react-redux';
import { getUser } from '../../Models/User/selectors';

export function Menu() {
  const user = useSelector(getUser);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const handleClickOpenLoginModal = () => setLoginModalOpen(true);
  const handleClickCloseLoginModal = () => setLoginModalOpen(false);

  return (
    <StyledMenu>
      {user.isLoggedIn ? (
        <Typography color="secondary">Hello {user.profile.name}</Typography>
      ) : (
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
