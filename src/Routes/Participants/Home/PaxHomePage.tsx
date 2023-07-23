import {
  PaxHomePageContainer,
  TrainingsContainer,
  ProfileContainer,
} from './PaxHomePage.style';
import { TrainingsTable } from '../../../Components/TrainingsTable/TrainingsTable';
import { Profile } from '../../../Components/Profile/Profile';
import { eTrainingConfirmStatus } from '../../../lib/enums';
import { useSelector } from 'react-redux';
import { getUserProfile } from '../../../Models/User/selectors';

const PaxHomePage = () => {
  const userProfile = useSelector(getUserProfile);

  return (
    <PaxHomePageContainer>
      <TrainingsContainer>
        <TrainingsTable
          label="My upcoming trainings"
          userId={userProfile?.userId as string}
          role="participant"
          timePeriod="presentAndFuture"
          trainingStatus={[
            eTrainingConfirmStatus.Accepted,
            eTrainingConfirmStatus.Confirmed,
            eTrainingConfirmStatus.Pending,
          ]}
          allowAddTrainingButton={true}
        />
      </TrainingsContainer>
      <ProfileContainer>
        <Profile />
      </ProfileContainer>
    </PaxHomePageContainer>
  );
};

export default PaxHomePage;
