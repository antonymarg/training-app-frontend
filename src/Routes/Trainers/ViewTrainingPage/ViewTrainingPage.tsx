import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ITraining } from '../../../Firebase/trainingModule/trainingModule.types';
import { notificationsModule, trainingModule } from '../../../Firebase';
import { FullBodyLoader } from '../../../Components/FullBodyLoader/FullBodyLoader';
import {
  AnnouncementsContainer,
  TrainingInfoContainer,
  DetailsContainer,
  NavigatorContainer,
  TitleContainer,
  UsersBoxContainer,
  ViewTrainingPageContainer,
  ManageYourTrainingBar,
} from './viewTrainingPage.style';
import {
  Avatar,
  Chip,
  Typography,
  Badge,
  Stack,
  Theme,
  BadgeProps,
  Button,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { eTrainingConfirmStatus, eTrainingTypes } from '../../../lib/enums';
import { grey } from '@mui/material/colors';
import { ConfirmationChips } from '../../../Components/ConfirmationChips/ConfirmationChips';
import { useSelector } from 'react-redux';
import { getUserProfile } from '../../../Models/User/selectors';
import { Announcement } from '../../../Components/Announcement/Announcement';
import { INotification } from '../../../Models/Notifications/types';
import moment from 'moment';
import { Timestamp } from 'firebase/firestore';
import styled from 'styled-components';

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
    const searchOn =
      profile?.role === 'trainer' ? training?.trainers : training?.participants;
    if (
      !searchOn ||
      !searchOn[userId] ||
      searchOn[userId].status !== eTrainingConfirmStatus.Pending
    )
      return false;
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
        <ManageYourTrainingBar>
          <Typography fontSize="1.4rem" fontWeight="bold">
            Manage my training
          </Typography>
          <Button variant="contained">Add participants</Button>
          <Button
            variant="contained"
            onClick={() => navigate(`/announce/${trainingId}`)}
          >
            Send announcement
          </Button>
          <Button variant="contained">Send feedback form</Button>
        </ManageYourTrainingBar>
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
                      <StyledBadge
                        overlap="circular"
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        variant="dot"
                        status={trainer.status}
                      >
                        <Avatar
                          sx={{ width: 24, height: 24 }}
                          src={trainer.profile?.imgSrc}
                        />
                      </StyledBadge>
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
              {Object.keys(training.participants).map((participantId) => (
                <Chip
                  key={participantId}
                  label={`${training.participants[participantId].profile?.name} ${training.participants[participantId].profile?.surname}`}
                  icon={
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                      status={training.participants[participantId].status}
                    >
                      <Avatar
                        sx={{ width: 24, height: 24 }}
                        src={
                          training.participants[participantId].profile?.imgSrc
                        }
                      />
                    </StyledBadge>
                  }
                  onClick={() => navigate(`/user/${participantId}`)}
                />
              ))}
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
const getBadgeColour = (status: eTrainingConfirmStatus) => {
  switch (status) {
    case eTrainingConfirmStatus.Confirmed:
    case eTrainingConfirmStatus.Accepted:
      return 'success';
    case eTrainingConfirmStatus.Declined:
      return 'error';
    case eTrainingConfirmStatus.Pending:
      return 'secondary';
  }
};

const StyledBadge = styled(Badge)(
  ({
    theme,
    status,
  }: BadgeProps & { status: eTrainingConfirmStatus; theme: Theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: theme.palette[getBadgeColour(status)].main,
      color: theme.palette[getBadgeColour(status)].main,
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  })
);
