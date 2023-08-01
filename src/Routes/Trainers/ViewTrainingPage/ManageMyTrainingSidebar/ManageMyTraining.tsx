import { Typography, Button } from '@mui/material';
import { ManageContainer } from './manageMyTraining.style';
import { useNavigate } from 'react-router-dom';
import { ITraining } from '../../../../Firebase/trainingModule/trainingModule.types';
import moment from 'moment';
import { useMemo } from 'react';

interface IManageMyTrainingProps {
  training: ITraining;
  userId: string;
}

export function ManageMyTraining({ training, userId }: IManageMyTrainingProps) {
  const navigate = useNavigate();

  const permissions = useMemo(
    () => ({
      isUserATrainerInTheSession: Boolean(training.trainers[userId]),
      hasSessionStarted: moment(training.startDate).isBefore(moment()),
      hasSessionFinished: moment(training.endDate).isAfter(moment()),
    }),
    [training.endDate, training.startDate, training.trainers, userId]
  );

  if (!permissions.isUserATrainerInTheSession) return null;
  return (
    <ManageContainer>
      <Typography fontSize="1.4rem" fontWeight="bold">
        Manage my training
      </Typography>
      {!permissions.hasSessionStarted && (
        <Button variant="contained">Add participants</Button>
      )}
      <Button
        variant="contained"
        onClick={() => navigate(`/announce/${training.id}`)}
      >
        Send announcement
      </Button>
      {permissions.hasSessionFinished && (
        <Button variant="contained">Send feedback form</Button>
      )}
    </ManageContainer>
  );
}
