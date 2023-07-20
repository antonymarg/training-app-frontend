import {
  TrainerHopePageContainer,
  TrainingsContainer,
  ProfileContainer,
} from './trainerHomePage.style';
import { Trainings } from '../../../Components/Trainings/Trainings';
import { Profile } from '../../../Components/Profile/Profile';

const TrainerHomePage = () => {
  return (
    <TrainerHopePageContainer>
      <TrainingsContainer>
        <Trainings />
      </TrainingsContainer>
      <ProfileContainer>
        <Profile />
      </ProfileContainer>
    </TrainerHopePageContainer>
  );
};

export default TrainerHomePage;
