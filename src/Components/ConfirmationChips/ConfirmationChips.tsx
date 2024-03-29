import { Stack } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { TransparentChip } from '../TransparentChip/TransparentChip';
import { useSelector } from 'react-redux';
import { getUserProfile } from '../../Models/User/selectors';
import { trainingModule } from '../../Firebase';
import { IUserRole } from '../../Models/User/types';
import { eTrainingConfirmStatus } from '../../lib/enums';
import { useNavigate } from 'react-router-dom';

interface ConfirmationChipsProps {
  trainingId: string;
  getTraining: () => Promise<void>;
}

export function ConfirmationChips({
  trainingId,
  getTraining,
}: ConfirmationChipsProps) {
  const profile = useSelector(getUserProfile);
  const navigate = useNavigate();
  const onChipClick = async (status: eTrainingConfirmStatus) => {
    if (
      profile?.role === 'participant' &&
      status === eTrainingConfirmStatus.Accepted
    )
      return navigate(`/trainings/${trainingId}/enroll`);
    await trainingModule.updateUserStatus(
      trainingId,
      profile?.userId as string,
      profile?.role as IUserRole,
      status
    );
    await getTraining();
  };

  return (
    <Stack direction="row" spacing={1}>
      <TransparentChip
        color="info"
        icon={<DoneIcon />}
        label="Accept"
        onClick={() => onChipClick(eTrainingConfirmStatus.Accepted)}
      />
      <TransparentChip
        color="error"
        icon={<CloseIcon />}
        label="Decline"
        onClick={() => onChipClick(eTrainingConfirmStatus.Declined)}
      />
    </Stack>
  );
}
