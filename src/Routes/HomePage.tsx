import ParticipantPage from './ParticipantPage';
import TrainerPage from './TrainerPage';
import { useSelector } from 'react-redux';
import { getUserRole } from '../Models/User/selectors';
import PublicPage from './Public/Home/HomePage';

const HomePage = () => {
  const userType = useSelector(getUserRole);
  if (userType === 'participant') return <ParticipantPage />;
  if (userType === 'trainer') return <TrainerPage />;
  return <PublicPage />;
};

export default HomePage;
