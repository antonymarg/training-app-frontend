import { IconButton, Badge, Menu, Typography } from '@mui/material';
import { Notification } from './Notification/Notification';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from 'react';
import styled from 'styled-components';
import { useNotifications } from './useNotifications';

const NotificationsHeaderDiv = styled.div`
  padding: 8px 16px;
  min-width: 400px;
`;

export function NotificationsMenu() {
  const { notifications, onNotificationClick } = useNotifications();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton onClick={handleClick}>
        <Badge
          badgeContent={notifications.filter((notif) => !notif.seen).length}
          color="secondary"
        >
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
        <NotificationsHeaderDiv>
          <Typography fontSize={24} fontWeight="bold">
            Notifications
          </Typography>
          {notifications.length === 0 && (
            <Typography>No notifications</Typography>
          )}
        </NotificationsHeaderDiv>
        {notifications.map((notif, index) => (
          <Notification
            key={notif.notificationId}
            title={notif.title}
            text={notif.mainText}
            type={notif.type}
            seen={notif.seen}
            withDivider={Boolean(index < notifications.length - 1)}
            handleClick={() => onNotificationClick(notif)}
          />
        ))}
      </Menu>
    </>
  );
}
