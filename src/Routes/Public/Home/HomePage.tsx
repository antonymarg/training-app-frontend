import { Typography } from '@mui/material';
import {
  BigPhoto,
  BodyContainer,
  Header,
  MainText,
  PhotoAndHeaderContainer,
} from './HomePage.style';

const HomePage = () => {
  return (
    <BodyContainer>
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
    </BodyContainer>
  );
};

export default HomePage;
