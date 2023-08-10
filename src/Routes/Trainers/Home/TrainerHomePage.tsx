import {
  TrainerHomePageContainer,
  TrainingsContainer,
  ProfileContainer,
} from './trainerHomePage.style';
import { TrainingsTable, Profile, BodyContainer } from '../../../Components';
import { eTrainingConfirmStatus } from '../../../lib/enums';
import { useSelector } from 'react-redux';
import { getUserProfile } from '../../../Models/User/selectors';

const TrainerHomePage = () => {
  const userProfile = useSelector(getUserProfile);
  return (
    <BodyContainer>
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
    </BodyContainer>
  );
};

export default TrainerHomePage;
