import { useEffect, useState } from 'react';
import { Divider, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { TransparentChip } from '../TransparentChip/TransparentChip';
import PersonIcon from '@mui/icons-material/Person';
import { AnnouncementsContainer } from './announcement.style';
import { userModule } from '../../Firebase';
import { INotification } from '../../Models/Notifications/types';
import { eRecipientStatus } from '../../lib/enums';
import moment from 'moment';

interface IAnnouncementProps {
  announcement: INotification;
}

export function Announcement({ announcement }: IAnnouncementProps) {
  const [sender, setSender] = useState('');

  useEffect(() => {
    (async function () {
      const user = await userModule.getUserById(announcement.senderId);
      setSender(`${user.name} ${user.surname}`);
    })();
  }, [announcement.senderId]);

  return (
    <AnnouncementsContainer>
      <Stack spacing={1}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          flexWrap="wrap"
          useFlexGap
        >
          <Typography fontWeight="bold" fontSize="1.2rem">
            {announcement.title}
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {announcement.status === eRecipientStatus.received && (
              <TransparentChip
                label="New"
                color="secondary"
                variant="outlined"
                size="small"
              />
            )}
            {announcement.type === 'announcement' && (
              <TransparentChip
                variant="outlined"
                label="Announcement"
                color="info"
                size="small"
              />
            )}
            {announcement.type === 'reminder' && (
              <TransparentChip
                variant="outlined"
                label="reminder"
                color="info"
              />
            )}
            {announcement.type === 'task' && (
              <TransparentChip
                variant="outlined"
                label="Task"
                color="secondary"
              />
            )}
          </Stack>
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          flexWrap="wrap"
          useFlexGap
        >
          <Stack direction="row" spacing={0.5}>
            <CalendarMonthIcon color="disabled" fontSize="small" />
            <Typography variant="subtitle2" color={grey[700]}>
              {moment.unix(announcement.sentAt.seconds).calendar()}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.5}>
            <PersonIcon color="disabled" fontSize="small" />
            <Typography variant="subtitle2" color={grey[700]}>
              {sender}
            </Typography>
          </Stack>
        </Stack>
        <Divider style={{ margin: '8px 0px' }} />
        <Typography>{announcement.mainText}</Typography>
      </Stack>
    </AnnouncementsContainer>
  );
}
