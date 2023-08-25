import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ProfilePicContainer,
  ProfilePicture,
  ViewUserContainer,
} from './viewUser.style';
import { IUserProfile } from '../../../Models/User/types';
import { userModule } from '../../../Firebase';
import userImage from '../../../Assets/img/user.png';
import { Stack, Typography, useMediaQuery } from '@mui/material';
import { FullBodyLoader, TrainingsTable } from '../../../Components';
import { eTrainingConfirmStatus } from '../../../lib/enums';

export function ViewUser() {
  const { userId } = useParams();
  const isMobile = useMediaQuery('@media only screen and (max-width: 768px)');

  const [user, setUser] = useState<IUserProfile>();

  useEffect(() => {
    (async () => {
      let user = await userModule.getUserById(userId as string, true);
      setUser(user);
      document.title = `${user.name} ${user.surname}`;
    })();
  }, [userId]);

  if (!user) return <FullBodyLoader />;

  return (
    <ViewUserContainer>
      <ProfilePicContainer>
        <ProfilePicture src={user?.imgSrc ?? userImage} />
      </ProfilePicContainer>
      <Stack style={{ gridArea: 'header' }}>
        <Typography variant="h4">{`${user.name} ${user.surname}`}</Typography>
        <Typography>Birthday: {user?.dateOfBirth as string}</Typography>
        <Typography>Gender: {user.gender}</Typography>
        {user.bio && <Typography fontStyle="italic">"{user.bio}"</Typography>}
      </Stack>
      <Stack
        direction={isMobile ? 'column' : 'row'}
        spacing={2}
        style={{ gridArea: 'sessions' }}
      >
        <TrainingsTable
          label="Upcoming sessions"
          userId={user.userId}
          role={user.role}
          allowAddTrainingButton={false}
          timePeriod="presentAndFuture"
          trainingStatus={eTrainingConfirmStatus.Pending}
        />
        <TrainingsTable
          label={`Previously ${
            user.role === 'trainer' ? 'delivered' : 'attended'
          } sessions`}
          userId={user.userId}
          role={user.role}
          allowAddTrainingButton={false}
          timePeriod="past"
          trainingStatus={eTrainingConfirmStatus.Accepted}
        />
      </Stack>
    </ViewUserContainer>
  );
}
