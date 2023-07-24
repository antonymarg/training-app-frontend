import { IconButton, MenuItem, Stack, Typography } from '@mui/material';
import DoneIconRounded from '@mui/icons-material/DoneRounded';
import CloseIconRounded from '@mui/icons-material/CloseRounded';

export interface INotificationProps {
  type: 'notification' | 'invitation';
  title: string;
  text: string;
  withDivider: boolean;
  onAccept?: () => void;
  onReject?: () => void;
}

export function Notification({
  text,
  title,
  type,
  withDivider,
  onAccept,
  onReject,
}: INotificationProps) {
  return (
    <MenuItem divider={withDivider}>
      <Stack direction="row" spacing={2}>
        <Stack>
          <Typography fontWeight="bold">{title}</Typography>
          <Typography>{text}</Typography>
        </Stack>
        {type === 'invitation' && (
          <Stack direction="row" alignItems="center">
            <IconButton
              onClick={onAccept}
              sx={{ width: '35px', height: '35px' }}
            >
              <DoneIconRounded fontSize="small" />
            </IconButton>
            <IconButton
              onClick={onReject}
              sx={{ width: '35px', height: '35px' }}
            >
              <CloseIconRounded fontSize="small" />
            </IconButton>
          </Stack>
        )}
      </Stack>
    </MenuItem>
  );
}
