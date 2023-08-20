import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { feedbackModule } from '../../../Firebase/feedbackModule/feedbackModule';
import { IFeedbackFormResponse } from '../../../Firebase/feedbackModule/feedbackModule.types';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { ITraining } from '../../../Firebase/trainingModule/trainingModule.types';
import { trainingModule } from '../../../Firebase';
import { FullBodyLoader } from '../../../Components';
import { grey } from '@mui/material/colors';

export function ViewFeedbackFormPage() {
  const { trainingId } = useParams();
  const isMobile = useMediaQuery('@media only screen and (max-width: 768px)');
  const [training, setTraining] = useState<ITraining>();
  const [feedbacks, setFeedbacks] = useState<IFeedbackFormResponse[]>([]);

  useEffect(() => {
    (async function () {
      const resp = await feedbackModule.getFeedbackResponses(
        trainingId as string
      );
      setFeedbacks(resp);
      const training = await trainingModule.getTrainingById(
        trainingId as string
      );
      setTraining(training);
    })();
  }, [trainingId]);

  if (!training) return <FullBodyLoader />;

  return (
    <Stack spacing={2}>
      <Typography variant="h5" fontWeight="bold" fontSize="1.6em">
        View feedback for {training.title}
      </Typography>
      {feedbacks.length === 0 ? (
        <Typography>No responses yet</Typography>
      ) : (
        feedbacks.map((fb) => (
          <Stack
            key={fb.user.userId}
            style={{
              border: `1px solid ${grey[300]}`,
              borderRadius: 20,
              padding: 16,
            }}
            spacing={2}
          >
            <Typography fontWeight="bold">{`${fb.user.name} ${fb.user.surname}`}</Typography>
            <FormControl>
              <FormLabel id="difficulty">
                The difficulty of the session was
              </FormLabel>
              <RadioGroup
                row={!isMobile}
                name="difficulty"
                value={fb.response.difficulty}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Very easy"
                />
                <FormControlLabel value="2" control={<Radio />} label="" />
                <FormControlLabel value="3" control={<Radio />} label="" />
                <FormControlLabel value="4" control={<Radio />} label="" />
                <FormControlLabel
                  value="5"
                  control={<Radio />}
                  label="Very hard"
                />
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel id="pace">The pace of the session was</FormLabel>
              <RadioGroup row={!isMobile} name="pace" value={fb.response.pace}>
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Very slow"
                />
                <FormControlLabel value="2" control={<Radio />} label="" />
                <FormControlLabel value="3" control={<Radio />} label="" />
                <FormControlLabel value="4" control={<Radio />} label="" />
                <FormControlLabel
                  value="5"
                  control={<Radio />}
                  label="Very fast"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              id="stickedOut"
              label="Please tell us some points that sticked out to you after the session"
              value={fb.response.stickedOut}
              multiline
              minRows={2}
              fullWidth
              InputProps={{ readOnly: true }}
            />
            <TextField
              id="imrpovement"
              label="Please provide some improvement points for the session"
              value={fb.response.improvement}
              multiline
              minRows={2}
              fullWidth
              InputProps={{ readOnly: true }}
            />
            <TextField
              id="trainers"
              label="How do you see the performance of the trainers? Please provide some improvement points for them"
              value={fb.response.trainers}
              multiline
              minRows={2}
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Stack>
        ))
      )}
    </Stack>
  );
}
