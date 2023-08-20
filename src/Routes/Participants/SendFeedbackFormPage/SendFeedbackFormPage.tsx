import { useParams } from 'react-router-dom';
import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { FullBodyLoader } from '../../../Components';
import { useSendFeedback } from './useSendFeedback';

export function SendFeedbackFormPage() {
  const { trainingId } = useParams();
  const { formData, handleInputChange, training, errors, onSubmit, isLoading } =
    useSendFeedback(trainingId as string);
  const isMobile = useMediaQuery('@media only screen and (max-width: 768px)');

  if (isLoading) return <FullBodyLoader />;
  return (
    <Stack spacing={2}>
      <Typography variant="h5" fontWeight="bold" fontSize="1.6em">
        Send feedback for {training?.title}
      </Typography>
      <Typography>
        Your insights matter greatly in our quest for continuous improvement. As
        you prepare to share your thoughts, remember that your honest and
        constructive feedback is the compass guiding our journey towards
        excellence. Your words have the power to refine experiences, elevate
        learning, and refine the path ahead. We value your perspective and thank
        you for helping us shape a brighter educational tomorrow.
      </Typography>
      <FormControl>
        <FormLabel id="difficulty">The difficulty of the session was</FormLabel>
        <RadioGroup
          row={!isMobile}
          name="difficulty"
          value={formData.difficulty}
          onChange={(v) =>
            handleInputChange({ difficulty: Number(v.target.value) })
          }
        >
          <FormControlLabel value="1" control={<Radio />} label="Very easy" />
          <FormControlLabel value="2" control={<Radio />} label="" />
          <FormControlLabel value="3" control={<Radio />} label="" />
          <FormControlLabel value="4" control={<Radio />} label="" />
          <FormControlLabel value="5" control={<Radio />} label="Very hard" />
        </RadioGroup>
        {errors.difficultyError && (
          <FormHelperText error={Boolean(errors.difficultyError)}>
            {errors.difficultyError}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl>
        <FormLabel id="pace">The pace of the session was</FormLabel>
        <RadioGroup
          row={!isMobile}
          name="pace"
          value={formData.pace}
          onChange={(v) => handleInputChange({ pace: Number(v.target.value) })}
        >
          <FormControlLabel value="1" control={<Radio />} label="Very slow" />
          <FormControlLabel value="2" control={<Radio />} label="" />
          <FormControlLabel value="3" control={<Radio />} label="" />
          <FormControlLabel value="4" control={<Radio />} label="" />
          <FormControlLabel value="5" control={<Radio />} label="Very fast" />
        </RadioGroup>
        {errors.paceError && (
          <FormHelperText error={Boolean(errors.paceError)}>
            {errors.paceError}
          </FormHelperText>
        )}
      </FormControl>
      <TextField
        id="stickedOut"
        label="Please tell us some points that sticked out to you after the session"
        value={formData.stickedOut}
        multiline
        minRows={2}
        error={Boolean(errors.stickedOutError)}
        helperText={errors.stickedOutError}
        fullWidth
        onChange={(v) => handleInputChange({ stickedOut: v.target.value })}
      />
      <TextField
        id="imrpovement"
        label="Please provide some improvement points for the session"
        value={formData.improvement}
        multiline
        minRows={2}
        error={Boolean(errors.improvementError)}
        helperText={errors.improvementError}
        fullWidth
        onChange={(v) => handleInputChange({ improvement: v.target.value })}
      />
      <TextField
        id="trainers"
        label="How do you see the performance of the trainers? Please provide some improvement points for them"
        value={formData.trainers}
        multiline
        minRows={2}
        error={Boolean(errors.trainersError)}
        helperText={errors.trainersError}
        fullWidth
        onChange={(v) => handleInputChange({ trainers: v.target.value })}
      />
      <Button
        variant="contained"
        size="large"
        sx={{ width: 'min-content' }}
        onClick={onSubmit}
      >
        {isLoading ? <CircularProgress size={25} color="primary" /> : 'Submit'}
      </Button>
    </Stack>
  );
}
