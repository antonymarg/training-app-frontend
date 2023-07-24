import { IconButton, Badge, Menu } from '@mui/material';
import { INotificationProps, Notification } from './Notification/Notification';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from 'react';

export function NotificationsMenu() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const notifications: INotificationProps[] = [
    {
      type: 'notification',
      title: 'First notification',
      text: 'This is your first notification',
      withDivider: true,
    },
    {
      type: 'invitation',
      title: 'Second notification',
      text: 'This is your second notification',
      withDivider: false,
    },
  ];
  return (
    <>
      <IconButton onClick={handleClick}>
        <Badge badgeContent={notifications.length} color="secondary">
          <NotificationsIcon color="secondary" />
        </Badge>
      </IconButton>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClick={handleClose}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {notifications.map((notif) => (
          <Notification {...notif} />
        ))}
      </Menu>
    </>
  );
}
