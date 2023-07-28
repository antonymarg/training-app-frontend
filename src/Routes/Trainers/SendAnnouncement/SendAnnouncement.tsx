import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { SendAnnouncementContainer } from './sendAnnouncement.style';
import {
  Stack,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import { notificationsModule, trainingModule } from '../../../Firebase';
import { useSelector } from 'react-redux';
import { getUserProfile } from '../../../Models/User/selectors';
import { eRecipientStatus } from '../../../Models/Notifications/types';

interface IAnnounement {
  title: string;
  mainText: string;
}
interface IRecipients {
  [key: string]: eRecipientStatus;
}
const defaultState: IAnnounement = {
  title: '',
  mainText: '',
};
export function SendAnnouncement() {
  const { trainingId } = useParams();
  const profile = useSelector(getUserProfile);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IAnnounement>(defaultState);
  const [isLoading, setIsLoading] = useState(false);
  const recipients: IRecipients = {};

  const onContinue = async () => {
    setIsLoading(true);
    let training = await trainingModule.getTrainingById(trainingId as string);
    Object.keys(training.participants).forEach(
      (pax) => (recipients[pax] = eRecipientStatus.received)
    );
    await notificationsModule.sendNotification({
      senderId: profile?.userId as string,
      title: formData.title,
      mainText: formData.mainText,
      type: 'announcement',
      trainingId: trainingId as string,
      recipients,
    });
    setIsLoading(false);
    navigate(`/trainings/${trainingId}`);
  };

  return (
    <SendAnnouncementContainer>
      <Typography style={{ gridArea: 'header' }} variant="h4">
        Send announcement
      </Typography>
      <Stack style={{ gridArea: 'form' }} direction="column" spacing={1}>
        <TextField
          id="title"
          label="Title"
          value={formData.title}
          required
          fullWidth
          onChange={(v) => setFormData({ ...formData, title: v.target.value })}
        />
        <TextField
          id="mainText"
          label="Main text"
          value={formData.mainText}
          multiline
          minRows={2}
          fullWidth
          onChange={(v) =>
            setFormData({ ...formData, mainText: v.target.value })
          }
        />
      </Stack>
      <Button
        variant="contained"
        size="large"
        onClick={onContinue}
        style={{ gridArea: 'button' }}
      >
        {isLoading ? (
          <CircularProgress color="secondary" size={25} />
        ) : (
          'Create'
        )}
      </Button>
    </SendAnnouncementContainer>
  );
}
