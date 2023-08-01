import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { Chip, Typography, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import {
  Announcement,
  AvatarWithBadge,
  ConfirmationChips,
  FullBodyLoader,
} from '../../../Components';

import {
  AnnouncementsContainer,
  TrainingInfoContainer,
  DetailsContainer,
  NavigatorContainer,
  TitleContainer,
  UsersBoxContainer,
  ViewTrainingPageContainer,
} from './viewTrainingPage.style';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { useSelector } from 'react-redux';
import { getUserProfile } from '../../../Models/User/selectors';

import { notificationsModule, trainingModule } from '../../../Firebase';
import { eTrainingConfirmStatus, eTrainingTypes } from '../../../lib/enums';
import { INotification } from '../../../Models/Notifications/types';
import { ITraining } from '../../../Firebase/trainingModule/trainingModule.types';
import { Timestamp } from 'firebase/firestore';

import moment from 'moment';
import { ManageMyTraining } from './ManageMyTrainingSidebar/ManageMyTraining';

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
  const profile = useSelector(getUserProfile);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [training, setTraining] = useState<ITraining>();
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const userId = profile?.userId as string;

  const isPartOfTrainingAndNotConfirmed = () => {
    if (
      training?.trainers[userId]?.status === eTrainingConfirmStatus.Pending ||
      training?.participants[userId]?.status === eTrainingConfirmStatus.Pending
    )
      return true;
  };

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      if (!trainingId) return;
      let trainingResp = await trainingModule.getTrainingById(trainingId, true);
      setTraining(trainingResp);
      let notifResp = await notificationsModule.getAllAnnouncementsForTraining(
        trainingId,
        userId
      );
      setNotifications(notifResp);
      setIsLoading(false);
    })();
  }, [trainingId, userId]);

  if (isLoading || !training) return <FullBodyLoader />;
  return (
    <ViewTrainingPageContainer>
      <NavigatorContainer>
        <Chip
          style={{ gridArea: 'navigation' }}
          icon={<ArrowBackIosIcon />}
          label="Go back"
          onClick={() => navigate('/')}
        />
        {isPartOfTrainingAndNotConfirmed() && (
          <ConfirmationChips
            containerStyle={{ gridArea: 'accept' }}
            trainingId={trainingId as string}
          />
        )}
      </NavigatorContainer>
      {training.trainers[userId]?.status > 1 && (
        <ManageMyTraining trainingId={trainingId as string} />
      )}
      <TrainingInfoContainer>
        <TitleContainer>
          <Typography variant="h4">{training?.title}</Typography>
        </TitleContainer>
        <DetailsContainer>
          <Stack direction="column" spacing={0.5} flexWrap="wrap">
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
        <UsersBoxContainer>
          <Stack spacing={1}>
            <Typography fontWeight="bold" fontSize="1.4rem">
              Trainers
            </Typography>
            <Stack direction="row" useFlexGap gap={0.5} flexWrap="wrap">
              {Object.keys(training.trainers).map((trainerId) => {
                let trainer = training.trainers[trainerId];
                return (
                  <Chip
                    key={trainerId}
                    label={`${trainer.profile?.name} ${trainer.profile?.surname}`}
                    icon={
                      <AvatarWithBadge
                        status={trainer.status}
                        imgSrc={trainer.profile?.imgSrc}
                      />
                    }
                    onClick={() => navigate(`/user/${trainerId}`)}
                  />
                );
              })}
            </Stack>
          </Stack>
          <Stack spacing={1}>
            <Typography fontWeight="bold" fontSize="1.4rem">
              Participants
            </Typography>
            <Stack direction="row" useFlexGap gap={0.5}>
              {Object.keys(training.participants).map((participantId) => {
                let participant = training.participants[participantId];
                return (
                  <Chip
                    key={participantId}
                    label={`${participant.profile?.name} ${participant.profile?.surname}`}
                    icon={
                      <AvatarWithBadge
                        status={participant.status}
                        imgSrc={participant.profile?.imgSrc}
                      />
                    }
                    onClick={() => navigate(`/user/${participantId}`)}
                  />
                );
              })}
            </Stack>
          </Stack>
        </UsersBoxContainer>
        {notifications.length !== 0 && (
          <AnnouncementsContainer>
            <Typography fontWeight="bold" fontSize="1.4rem">
              Announcements
            </Typography>
            <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
              {notifications.map((notif) => (
                <Announcement key={notif.notificationId} announcement={notif} />
              ))}
            </Stack>
          </AnnouncementsContainer>
        )}
      </TrainingInfoContainer>
    </ViewTrainingPageContainer>
  );
}
