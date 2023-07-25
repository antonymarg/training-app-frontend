import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ITraining } from '../../../Firebase/trainingModule/trainingModule.types';
import { trainingModule } from '../../../Firebase';
import { FullBodyLoader } from '../../../Components/FullBodyLoader/FullBodyLoader';
import {
  AnnouncementsContainer,
  DetailsContainer,
  NavigatorContainer,
  ParticipantsBoxContainer,
  TitleContainer,
  TrainersBoxContainer,
  ViewTrainingPageContainer,
} from './viewTrainingPage.style';
import { Chip, Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import moment from 'moment';
import { eTrainingTypes } from '../../../lib/enums';
import { grey } from '@mui/material/colors';
import { UserAvatar } from '../../../Components/UserAvatar/UserAvatar';
import { ConfirmationChips } from '../../../Components/ConfirmationChips/ConfirmationChips';
import { Timestamp } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { getUserProfile } from '../../../Models/User/selectors';

const calcTrainingTimeText = (start: Timestamp, end: Timestamp) => {
  let startDate = moment.unix(start.seconds);
  let endDate = moment.unix(end.seconds);
  return startDate.isSame(endDate, 'date')
    ? `${startDate.format('LL')}`
    : `${startDate.format('LLL')} - ${endDate.format('LLL')}`;
};

const calcTrainingPlace = (type: eTrainingTypes, location?: string) => {
  return type === eTrainingTypes.online ? `Online` : `Live at ${location}`;
};

export function ViewTrainingPage() {
  const { trainingId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const profile = useSelector(getUserProfile);
  const [training, setTraining] = useState<ITraining>();
  const navigate = useNavigate();
  const isPartOfTrainingAndNotConfirmed = () => {
    const userId = profile?.userId as string;
    const searchOn =
      profile?.role === 'trainer' ? training?.trainers : training?.participants;
    if (!searchOn || !searchOn[userId] || searchOn[userId].status) return false;
    return true;
  };

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      if (!trainingId) return;
      let trainingResp = await trainingModule.getTrainingById(trainingId, true);
      setTraining(trainingResp);
      setIsLoading(false);
    })();
  }, [trainingId]);

  if (isLoading || !training) return <FullBodyLoader />;
  return (
    <ViewTrainingPageContainer>
      <NavigatorContainer>
        <Chip
          icon={<ArrowBackIosIcon />}
          label="Go back"
          onClick={() => navigate('/')}
        />
      </NavigatorContainer>
      <TitleContainer>
        <Typography variant="h4">{training?.title}</Typography>
      </TitleContainer>
      {isPartOfTrainingAndNotConfirmed() && (
        <div style={{ gridArea: 'chips', marginLeft: 'auto' }}>
          <ConfirmationChips trainingId={trainingId as string} />
        </div>
      )}
      <DetailsContainer>
        <Stack direction="column" spacing={0.5}>
          <Stack direction="row" spacing={1} alignItems="center">
            <CalendarMonthIcon color="disabled" fontSize="small" />
            <Typography variant="subtitle2" color={grey[700]}>
              {calcTrainingTimeText(
                training.startDate as unknown as Timestamp,
                training.endDate as unknown as Timestamp
              )}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <LocationOnIcon color="disabled" fontSize="small" />
            <Typography variant="subtitle2" color={grey[700]}>
              {calcTrainingPlace(training.type, training.location)}
            </Typography>
          </Stack>
          {training.description && (
            <Stack direction="row" spacing={1}>
              <Typography variant="body2" color={grey[700]}>
                {training.description}
              </Typography>
            </Stack>
          )}
        </Stack>
      </DetailsContainer>
      <TrainersBoxContainer>
        <Typography variant="h6">Trainers</Typography>
        <Grid
          container
          spacing={0.5}
          rowSpacing={1}
          columns={{ sm: 2, md: 4 }}
          height="fit-content"
        >
          {Object.keys(training.trainers).map((trainerId) => (
            <Grid key={trainerId} item sm={1} height="fit-content">
              <UserAvatar
                userId={trainerId}
                status={training.trainers[trainerId].status}
                fullName={`${training.trainers[trainerId].profile?.name} ${training.trainers[trainerId].profile?.surname}`}
                picture={training.trainers[trainerId].profile?.imgSrc}
              />
            </Grid>
          ))}
        </Grid>
      </TrainersBoxContainer>
      <ParticipantsBoxContainer>
        <Typography variant="h6">Participants</Typography>
        <Grid
          container
          spacing={0.5}
          rowSpacing={2}
          columns={{ sm: 2, md: 4 }}
          height="fit-content"
        >
          {Object.keys(training.participants).map((participantId) => (
            <Grid key={participantId} item sm={1} height="fit-content">
              <UserAvatar
                userId={participantId}
                status={training.participants[participantId].status}
                fullName={`${training.participants[participantId].profile?.name} ${training.participants[participantId].profile?.surname}`}
                picture={training.participants[participantId].profile?.imgSrc}
              />
            </Grid>
          ))}
        </Grid>
      </ParticipantsBoxContainer>
      <AnnouncementsContainer>
        <Typography variant="h6">Announcements</Typography>
      </AnnouncementsContainer>
    </ViewTrainingPageContainer>
  );
}
