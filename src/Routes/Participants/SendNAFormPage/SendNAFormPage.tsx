import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { trainingModule } from '../../../Firebase';
import { useSelector } from 'react-redux';
import { getUserProfile } from '../../../Models/User/selectors';
import { eTrainingConfirmStatus } from '../../../lib/enums';
import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { needsAssessmentModule } from '../../../Firebase/needsAssessmentModule';

export function SendNAFormPage() {
  const { trainingId } = useParams();
  const profile = useSelector(getUserProfile);
  const [formReplies, setFormReplies] = useState({
    motivation: '',
    expectation: '',
  });
  const [formErrors, setFormErrors] = useState<{
    motivationError?: string;
    expectationError?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async () => {
    setIsLoading(true);
    setFormErrors({});
    if (!formReplies.motivation) {
      setIsLoading(false);

      return setFormErrors({ motivationError: 'This is required' });
    }
    if (!formReplies.expectation) {
      setIsLoading(false);
      return setFormErrors({ expectationError: 'This is required' });
    }
    await needsAssessmentModule.sendNAForm(
      trainingId as string,
      profile?.userId as string,
      formReplies
    );
    await trainingModule.updateUserStatus(
      trainingId as string,
      profile?.userId as string,
      'participant',
      eTrainingConfirmStatus.Confirmed
    );
    setIsLoading(false);
    navigate(`/trainings/${trainingId}`);
  };
  return (
    <Stack spacing={2}>
      <div>
        <Typography variant="h4">Before you join...</Typography>
        <Typography>Let us get to know you better!</Typography>
      </div>
      <Stack spacing={1}>
        <TextField
          id="Q1"
          label="Why do you want to participate in this session?"
          value={formReplies.motivation}
          required
          multiline
          minRows={2}
          fullWidth
          onChange={(v) =>
            setFormReplies({ ...formReplies, motivation: v.target.value })
          }
          error={Boolean(formErrors.motivationError)}
          helperText={formErrors.motivationError}
        />
        <TextField
          id="Q2"
          label="What do you expect from this session?"
          value={formReplies.expectation}
          required
          multiline
          minRows={2}
          fullWidth
          onChange={(v) =>
            setFormReplies({ ...formReplies, expectation: v.target.value })
          }
          error={Boolean(formErrors.expectationError)}
          helperText={formErrors.expectationError}
        />
      </Stack>
      <Button
        variant="contained"
        onClick={onSubmit}
        sx={{ width: 'fit-content', marginLeft: 'auto' }}
      >
        {isLoading ? (
          <CircularProgress color="secondary" size={25} />
        ) : (
          'Confirm attendance'
        )}
      </Button>
    </Stack>
  );
}
