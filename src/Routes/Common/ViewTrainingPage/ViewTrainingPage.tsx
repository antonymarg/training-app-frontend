import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import {
  Chip,
  Typography,
  Stack,
  Grid,
  useMediaQuery,
  Link,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import {
  Announcement,
  AvatarWithBadge,
  FullBodyLoader,
  Task,
} from '../../../Components';

import { ViewTrainingPageContainer } from './viewTrainingPage.style';
import { ViewTrainingSidebar } from './Sidebar/ViewTrainingSidebar';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import { useSelector } from 'react-redux';
import { getUserProfile } from '../../../Models/User/selectors';

import {
  assetsModule,
  notificationsModule,
  trainingModule,
} from '../../../Firebase';
import { eTrainingTopics, eTrainingTypes } from '../../../lib/enums';
import { INotification } from '../../../Models/Notifications/types';
import { ITraining } from '../../../Firebase/trainingModule/trainingModule.types';
import { Timestamp } from 'firebase/firestore';

import moment from 'moment';
import { ITask } from '../../../Firebase/tasksModule/tasksModule.types';
import { taskModule } from '../../../Firebase/tasksModule';
import { IUserRole } from '../../../Models/User/types';

const calcTrainingTimeText = (start: Timestamp, end: Timestamp) => {
  let startDate = moment.unix(start.seconds);
  let endDate = moment.unix(end.seconds);
  return startDate.isSame(endDate, 'date')
    ? `${startDate.format('LL')} ${startDate.format(
        'HH:MM'
      )} - ${endDate.format('HH:MM')} `
    : `${startDate.format('LLL')} - ${endDate.format('LLL')}`;
};

const calcTrainingPlace = (type: eTrainingTypes, location?: string) => {
  return type === eTrainingTypes.online ? `Online` : `Live at ${location}`;
};

export function ViewTrainingPage() {
  const { trainingId } = useParams();
  const profile = useSelector(getUserProfile);
  const navigate = useNavigate();

  const isMobile = useMediaQuery('@media only screen and (max-width: 768px)');
  const [isLoading, setIsLoading] = useState(true);
  const [training, setTraining] = useState<ITraining>();
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const userId = profile?.userId as string;

  const getTraining = useCallback(async () => {
    setIsLoading(true);
    if (!trainingId) return;
    let trainingResp = await trainingModule.getTrainingById(trainingId, true);
    setTraining({ ...trainingResp, id: trainingId });
    let notifResp = await notificationsModule.getAllAnnouncementsForTraining(
      trainingId,
      userId
    );
    let tasksResp = await taskModule.getTasksForTraining(
      trainingId,
      userId,
      profile?.role as IUserRole
    );
    setNotifications(notifResp);
    setTasks(tasksResp);
    document.title = trainingResp.title;
    setIsLoading(false);
  }, [profile?.role, trainingId, userId]);

  useEffect(() => {
    (async function () {
      await getTraining();
    })();
  }, [getTraining]);

  const onTaskComplete = async (taskId: string) => {
    await taskModule.markTaskAsCompleted(
      taskId,
      userId,
      training?.id as string,
      `${profile?.name} ${profile?.surname}`
    );
    await getTraining();
  };

  if (isLoading || !training) return <FullBodyLoader />;
  return (
    <ViewTrainingPageContainer>
      <Stack spacing={2} gridArea="main-content">
        <Typography variant="h4">{training?.title}</Typography>
        <Stack direction="column" spacing={0.5} flexWrap="wrap">
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
          {training.topic && (
            <Stack direction="row" spacing={1} alignItems="center">
              <LocalOfferIcon color="disabled" fontSize="small" />
              <Typography variant="subtitle2" color={grey[700]}>
                {eTrainingTopics[training.topic]}
              </Typography>
            </Stack>
          )}
          {training.description && (
            <Stack direction="row" spacing={1}>
              <Typography variant="body2" color={grey[700]}>
                {training.description}
              </Typography>
            </Stack>
          )}
        </Stack>
        <Stack spacing={0.5}>
          <Typography fontWeight="bold" fontSize="1.4rem">
            Trainers
          </Typography>
          <Grid container spacing={1}>
            {Object.keys(training.trainers).map((trainerId) => {
              let trainer = training.trainers[trainerId];
              return (
                <Grid key={trainerId} item xs={6} md={2}>
                  <Chip
                    label={`${trainer.profile?.name} ${trainer.profile?.surname}`}
                    icon={
                      <AvatarWithBadge
                        status={trainer.status}
                        imgSrc={trainer.profile?.imgSrc}
                      />
                    }
                    onClick={() => navigate(`/user/${trainerId}`)}
                    sx={{ paddingLeft: 0.5 }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Stack>
        <Stack spacing={0.5}>
          <Typography fontWeight="bold" fontSize="1.4rem">
            Participants
          </Typography>
          <Grid container spacing={1}>
            {Object.keys(training.participants).map((participantId) => {
              let participant = training.participants[participantId];
              return (
                <Grid key={participantId} item xs={6} md={2}>
                  <Chip
                    label={`${participant.profile?.name} ${participant.profile?.surname}`}
                    icon={
                      <AvatarWithBadge
                        status={participant.status}
                        imgSrc={participant.profile?.imgSrc}
                      />
                    }
                    sx={{ paddingLeft: 0.5 }}
                    onClick={() => navigate(`/user/${participantId}`)}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Stack>
        {notifications.length !== 0 && (
          <Stack spacing={1} useFlexGap>
            <Typography fontWeight="bold" fontSize="1.4rem">
              Announcements
            </Typography>
            <Grid container spacing={2}>
              {notifications.map((notif) => (
                <Grid item xs={12} md={6} key={notif.notificationId}>
                  <Announcement announcement={notif} />
                </Grid>
              ))}
            </Grid>
          </Stack>
        )}
      </Stack>
      <Stack spacing={2} gridArea="sidebar">
        <ViewTrainingSidebar
          training={training}
          userId={userId}
          getTraining={getTraining}
        />
        {!isMobile && training.followUpMaterials && (
          <Stack>
            <Typography fontWeight="bold" fontSize="1.4rem">
              Follow-up materials
            </Typography>
            <ul>
              <Stack spacing={1}>
                {training.followUpMaterials.map((material, index) => (
                  <li key={index}>
                    <Link
                      onClick={async () => {
                        const link = await assetsModule.getAsset(
                          material.fileUrl
                        );
                        window.open(link, '_blank');
                      }}
                    >
                      <Typography>{material.title}</Typography>
                    </Link>
                  </li>
                ))}
              </Stack>
            </ul>
          </Stack>
        )}
        {!isMobile && tasks.length !== 0 && (
          <Stack>
            <Typography fontWeight="bold" fontSize="1.4rem">
              Tasks
            </Typography>
            <Grid container marginTop={1} spacing={1}>
              {tasks.map((task) => (
                <Grid item xs={12} key={task.id}>
                  <Task
                    task={task}
                    onTaskComplete={onTaskComplete}
                    userRole={profile?.role as IUserRole}
                  />
                </Grid>
              ))}
            </Grid>
          </Stack>
        )}
      </Stack>
      {isMobile && tasks.length !== 0 && (
        <Stack>
          <Typography fontWeight="bold" fontSize="1.4rem">
            Tasks
          </Typography>
          <Grid container marginTop={1} spacing={1}>
            {tasks.map((task) => (
              <Grid item xs={12} key={task.id}>
                <Task
                  task={task}
                  onTaskComplete={onTaskComplete}
                  userRole={profile?.role as IUserRole}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
      )}
    </ViewTrainingPageContainer>
  );
}
