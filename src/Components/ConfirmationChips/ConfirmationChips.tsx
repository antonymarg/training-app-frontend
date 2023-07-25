import { Chip, Stack } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { eTrainingConfirmStatus } from '../../lib/enums';
import { trainingModule } from '../../Firebase';
import { IUserRole } from '../../Models/User/types';
import { useSelector } from 'react-redux';
import { getUserProfile } from '../../Models/User/selectors';
import { useNavigate } from 'react-router-dom';

interface ConfirmationChipsProps {
  trainingId: string;
}

export function ConfirmationChips({ trainingId }: ConfirmationChipsProps) {
  const profile = useSelector(getUserProfile);
  const navigate = useNavigate();
  const onChipClick = async (status: eTrainingConfirmStatus) => {
    await trainingModule.updateUserStatus(
      trainingId,
      profile?.userId as string,
      profile?.role as IUserRole,
      status
    );
    navigate('/trainings/' + trainingId);
  };

  return (
    <Stack direction="row" spacing={1}>
      <Chip
        color="info"
        icon={<DoneIcon />}
        label="Accept"
        onClick={() => onChipClick(eTrainingConfirmStatus.Accepted)}
      />
      <Chip
        color="error"
        icon={<CloseIcon />}
        label="Decline"
        onClick={() => onChipClick(eTrainingConfirmStatus.Declined)}
      />
    </Stack>
  );
}
