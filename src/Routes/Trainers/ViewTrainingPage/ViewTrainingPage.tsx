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
import { useSelector } from 'react-redux';
import { getUserProfile } from '../../../Models/User/selectors';

const calcTrainingTimeText = (start: string, end: string) => {
  let startDate = moment(start);
  let endDate = moment(end);
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
  const [training, setTraining] = useState<ITraining>();
  const profile = useSelector(getUserProfile);
  const navigate = useNavigate();

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
      <DetailsContainer>
        <Stack direction="column" spacing={0.5}>
          <Stack direction="row" spacing={1} alignItems="center">
            <CalendarMonthIcon color="disabled" fontSize="small" />
            <Typography variant="subtitle2" color={grey[700]}>
              {calcTrainingTimeText(training.startDate, training.endDate)}
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
          {training.trainers.map((trainer) => (
            <Grid item sm={1} height="fit-content">
              <UserAvatar
                key={trainer.userId}
                userId={trainer.userId as string}
                status={trainer.status}
                fullName={`${trainer.profile?.name} ${trainer.profile?.surname}`}
                picture={profile.imgSrc}
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
          {training.participants.map((participant) => (
            <Grid item sm={1} height="fit-content">
              <UserAvatar
                key={participant.userId}
                userId={participant.userId as string}
                status={participant.status}
                fullName={`${participant.profile?.name} ${participant.profile?.surname}`}
                picture={profile.imgSrc}
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
