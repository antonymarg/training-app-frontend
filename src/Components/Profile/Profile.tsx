import { useDispatch, useSelector } from 'react-redux';
import { updateUserLogout } from '../../Models/User/actions';
import { Button, Stack, Typography } from '@mui/material';
import { clearNotifications } from '../../Models/Notifications/actions';
import { getUserProfile } from '../../Models/User/selectors';
import userImage from '../../Assets/img/user.png';
import styled from 'styled-components';

export function Profile() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clearNotifications());
    dispatch(updateUserLogout());
  };
  const user = useSelector(getUserProfile);

  return (
    <Stack alignItems="center" spacing={1}>
      <ProfilePicture alt="userImg" src={user?.imgSrc ?? userImage} />
      <Typography fontWeight="bold">Welcome {user?.name}!</Typography>
      <Button variant="contained" onClick={handleLogout} color="primary">
        Log out
      </Button>
    </Stack>
  );
}

const ProfilePicture = styled.img`
  object-fit: cover;
  background-position: top center;
  border-radius: 50%;
  width: 100%;
  max-width: 250px;
  aspect-ratio: 1 / 1;

  @media only screen and (max-width: 768px) {
    width: 50%;
  }
`;
