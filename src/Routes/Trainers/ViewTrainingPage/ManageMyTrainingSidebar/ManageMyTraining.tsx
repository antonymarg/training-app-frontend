import { Typography, Button } from '@mui/material';
import { ManageContainer } from './manageMyTraining.style';
import { useNavigate } from 'react-router-dom';

interface IManageMyTrainingProps {
  trainingId: string;
}

export function ManageMyTraining({ trainingId }: IManageMyTrainingProps) {
  const navigate = useNavigate();
  return (
    <ManageContainer>
      <Typography fontSize="1.4rem" fontWeight="bold">
        Manage my training
      </Typography>
      <Button variant="contained">Add participants</Button>
      <Button
        variant="contained"
        onClick={() => navigate(`/announce/${trainingId}`)}
      >
        Send announcement
      </Button>
      <Button variant="contained">Send feedback form</Button>
    </ManageContainer>
  );
}
