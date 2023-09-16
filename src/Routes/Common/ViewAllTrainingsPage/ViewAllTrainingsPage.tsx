import { Stack, Typography } from '@mui/material';
import { TrainingsTable } from '../../../Components';
import { useSelector } from 'react-redux';
import { getUserProfile } from '../../../Models/User/selectors';
import { eTrainingConfirmStatus } from '../../../lib/enums';
import { IUserRole } from '../../../Models/User/types';
export function ViewAllTrainingsPage() {
  const user = useSelector(getUserProfile);
  return (
    <Stack spacing={2}>
      <Typography variant="h4">My trainings</Typography>
      <TrainingsTable
        label=""
        userId={user?.userId as string}
        role={user?.role as IUserRole}
        timePeriod="all"
        showFooter={false}
        trainingStatus={eTrainingConfirmStatus.Pending}
        allowAddTrainingButton={user?.role === 'trainer'}
      />
    </Stack>
  );
}
