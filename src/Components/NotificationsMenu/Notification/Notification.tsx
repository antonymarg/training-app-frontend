import { MenuItem, Stack, Typography } from '@mui/material';
import { INotificationTypes } from '../../../Models/Notifications/types';

import CircleIcon from '@mui/icons-material/Circle';

export interface INotificationProps {
  type: INotificationTypes;
  title: string;
  text: string;
  withDivider: boolean;
  seen: boolean;
  handleClick?: () => void;
}

export function Notification({
  text,
  title,
  type,
  handleClick,
  withDivider,
  seen,
}: INotificationProps) {
  return (
    <MenuItem divider={withDivider} onClick={handleClick}>
      <Stack direction="row" spacing={2}>
        <Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            {!seen && <CircleIcon sx={{ fontSize: '8px' }} color="secondary" />}
            <Typography fontWeight="bold">{title}</Typography>
          </Stack>
          <Typography>{text}</Typography>
        </Stack>
      </Stack>
    </MenuItem>
  );
}
