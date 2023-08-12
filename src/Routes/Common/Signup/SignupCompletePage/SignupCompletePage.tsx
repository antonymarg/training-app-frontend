import { CompletePageContainer } from './SignupCompletePage.style';
import SignupCompletedIcon from '../../../../Assets/svg/SignupCompletedIcon.svg';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function SignupCompletePage() {
  const navigate = useNavigate();
  return (
    <CompletePageContainer>
      <img src={SignupCompletedIcon} alt="complete" width="200px" />
      <Typography variant="h5">Welcome to training app!</Typography>
      <Button variant="contained" size="large" onClick={() => navigate('/')}>
        Log in
      </Button>
    </CompletePageContainer>
  );
}
