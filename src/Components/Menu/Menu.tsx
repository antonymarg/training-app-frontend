import { useSelector } from 'react-redux';
import { getUser } from '../../Models/User/selectors';

import { NotificationsMenu } from '../NotificationsMenu/NotificationMenu';
import {
  Button,
  Drawer,
  IconButton,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

export function Menu() {
  const user = useSelector(getUser);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // TODO: [UI] [BUG] [MOBILE] [MENU] Menu is not closing when clicking on the menu icon again
  const navigate = useNavigate();
  const isMobile = useMediaQuery('@media only screen and (max-width: 768px)');

  if (!user.isLoggedIn) return null;
  if (!isMobile)
    return (
      <Stack marginLeft="auto" direction="row" spacing={1}>
        <Button
          variant="text"
          color="secondary"
          onClick={() => {
            navigate('/trainings');
          }}
        >
          My trainings
        </Button>
        {user.profile?.role === 'participant' && (
          <Button
            variant="text"
            color="secondary"
            onClick={() => navigate('/materials')}
          >
            My received materials
          </Button>
        )}
        <NotificationsMenu />
      </Stack>
    );
  return (
    <>
      <Stack marginLeft="auto" direction="row" spacing={1}>
        <IconButton
          color="secondary"
          onClick={() => {
            setIsDrawerOpen(true);
          }}
        >
          <MenuIcon />
        </IconButton>
        <NotificationsMenu />
      </Stack>
      <Drawer
        open={isDrawerOpen}
        anchor="bottom"
        onClose={() => setIsDrawerOpen(false)}
      >
        <Stack spacing={1} padding={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              navigate('/trainings');
            }}
          >
            My trainings
          </Button>
          {user.profile?.role === 'participant' && (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate('/materials')}
            >
              My received materials
            </Button>
          )}
        </Stack>
      </Drawer>
    </>
  );
}
