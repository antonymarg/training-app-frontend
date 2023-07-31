import { Chip, Divider, Stack, Typography } from '@mui/material';
import { AnnouncementsContainer } from './announcement.style';
import {
  INotification,
  eRecipientStatus,
} from '../../Models/Notifications/types';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { userModule } from '../../Firebase';
import { grey } from '@mui/material/colors';
import styled from 'styled-components';
import { rgbToHex } from '@mui/material';

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
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography fontWeight="bold" fontSize="1.2rem">
          {announcement.title}
        </Typography>
        <Stack direction="row" spacing={1}>
          {announcement.status === eRecipientStatus.received && <NotSeenChip />}
          {announcement.type === 'announcement' && <AnnouncementChip />}
          {announcement.type === 'reminder' && <ReminderChip />}
        </Stack>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
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
    </AnnouncementsContainer>
  );
}

const MixedChip = styled(Chip)(({ theme, color }) => ({
  '&.MuiChip-root': {
    borderColor: theme.palette[color as string].main,
    background: `${rgbToHex(theme.palette[color as string].light) + '20'}`,
    color: theme.palette[color as string].dark,
  },
}));
const NotSeenChip = () => (
  <MixedChip label="New" color="secondary" variant="outlined" size="small" />
);
const AnnouncementChip = () => (
  <MixedChip
    variant="outlined"
    label="Announcement"
    color="info"
    size="small"
  />
);
const ReminderChip = () => (
  <MixedChip variant="outlined" label="reminder" color="info" />
);
