import { CSSProperties } from 'react';
import { Stack } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { TransparentChip } from '../TransparentChip/TransparentChip';
import { useSelector } from 'react-redux';
import { getUserProfile } from '../../Models/User/selectors';
import { trainingModule } from '../../Firebase';
import { IUserRole } from '../../Models/User/types';
import { eTrainingConfirmStatus } from '../../lib/enums';

interface ConfirmationChipsProps {
  trainingId: string;
  containerStyle: CSSProperties;
}

export function ConfirmationChips({
  trainingId,
  containerStyle,
}: ConfirmationChipsProps) {
  const profile = useSelector(getUserProfile);
  const onChipClick = async (status: eTrainingConfirmStatus) => {
    await trainingModule.updateUserStatus(
      trainingId,
      profile?.userId as string,
      profile?.role as IUserRole,
      status
    );
    window.location.reload();
  };

  return (
    <Stack direction="row" spacing={1} style={containerStyle}>
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
