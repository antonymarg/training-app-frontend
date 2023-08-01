import { CompletePageContainer } from './SignupCompletePage.style';
import SignupCompletedIcon from '../../../../Assets/svg/SignupCompletedIcon.svg';
import { Typography, Button } from '@mui/material';
import { useState } from 'react';
import { LoginModal } from '../../../../Components';

export function SignupCompletePage() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const handleClickOpenLoginModal = () => setLoginModalOpen(true);
  const handleClickCloseLoginModal = () => setLoginModalOpen(false);
  return (
    <CompletePageContainer>
      <img src={SignupCompletedIcon} alt="complete" width="200px" />
      <Typography variant="h5">Welcome to training app!</Typography>
      <Button
        variant="contained"
        size="large"
        onClick={handleClickOpenLoginModal}
      >
        Log in
      </Button>
      <LoginModal
        open={isLoginModalOpen}
        onClose={handleClickCloseLoginModal}
      />
    </CompletePageContainer>
  );
}
