import { PaxHomePageContainer } from './PaxHomePage.style';
import { TrainingsTable, Profile } from '../../../Components';
import { eTrainingConfirmStatus } from '../../../lib/enums';
import { useSelector } from 'react-redux';
import { getUserProfile } from '../../../Models/User/selectors';
import { PaxTasks } from './PaxTasks/PaxTasks';

const PaxHomePage = () => {
  const userProfile = useSelector(getUserProfile);

  return (
    <PaxHomePageContainer>
      <div style={{ gridArea: 'trainings' }}>
        <TrainingsTable
          label="My upcoming trainings"
          userId={userProfile?.userId as string}
          role="participant"
          timePeriod="presentAndFuture"
          trainingStatus={eTrainingConfirmStatus.Pending}
          allowAddTrainingButton={false}
          showFooter
        />
      </div>
      <div style={{ gridArea: 'profile' }}>
        <Profile />
      </div>
      <div style={{ gridArea: 'tasks' }}>
        <PaxTasks />
      </div>
    </PaxHomePageContainer>
  );
};

export default PaxHomePage;
