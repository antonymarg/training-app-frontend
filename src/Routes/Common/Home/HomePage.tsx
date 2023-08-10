import { Typography } from '@mui/material';
import {
  BigPhoto,
  MainBodyContainer,
  Header,
  MainText,
  PhotoAndHeaderContainer,
} from './HomePage.style';
import PaxHomePage from '../../Participants/Home/PaxHomePage';
import TrainerHomePage from '../../Trainers/Home/TrainerHomePage';
import { useSelector } from 'react-redux';
import { getUser } from '../../../Models/User/selectors';

const HomePage = () => {
  const user = useSelector(getUser);
  if (user.profile?.role === 'participant') return <PaxHomePage />;
  if (user.profile?.role === 'trainer') return <TrainerHomePage />;

  return (
    <MainBodyContainer>
      <PhotoAndHeaderContainer>
        <BigPhoto />
        <Header>
          <Typography variant="h2" color="white">
            Welcome to the future of training
          </Typography>
        </Header>
      </PhotoAndHeaderContainer>
      <MainText>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, vitae
          alias voluptates expedita neque beatae quidem repudiandae autem cumque
          rem ratione fugit architecto quia perspiciatis nisi velit, rerum
          assumenda dicta. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Minima, vitae alias voluptates expedita neque beatae quidem
          repudiandae autem cumque rem ratione fugit architecto quia
          perspiciatis nisi velit, rerum assumenda dicta.
        </Typography>
      </MainText>
    </MainBodyContainer>
  );
};

export default HomePage;
