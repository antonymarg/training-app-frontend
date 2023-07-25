import {
  TrainerHomePageContainer,
  TrainingsContainer,
  ProfileContainer,
} from './trainerHomePage.style';
import { TrainingsTable } from '../../../Components/TrainingsTable/TrainingsTable';
import { Profile } from '../../../Components/Profile/Profile';
import { eTrainingConfirmStatus } from '../../../lib/enums';
import { useSelector } from 'react-redux';
import { getUserProfile } from '../../../Models/User/selectors';

const TrainerHomePage = () => {
  const userProfile = useSelector(getUserProfile);
  return (
    <TrainerHomePageContainer>
      <TrainingsContainer>
        <TrainingsTable
          label="My upcoming trainings"
          userId={userProfile?.userId as string}
          role="trainer"
          timePeriod="presentAndFuture"
          trainingStatus={eTrainingConfirmStatus.Pending}
          allowAddTrainingButton={true}
        />
      </TrainingsContainer>
      <ProfileContainer>
        <Profile />
      </ProfileContainer>
    </TrainerHomePageContainer>
  );
};

export default TrainerHomePage;
