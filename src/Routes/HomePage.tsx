import ParticipantPage from './Participants/ParticipantPage';
import TrainerPage from './Trainers/Home/TrainerHomePage';
import { useSelector } from 'react-redux';
import { getUser } from '../Models/User/selectors';
import PublicPage from './Public/Home/HomePage';

const HomePage = () => {
  const user = useSelector(getUser);
  if (!user.isLoggedIn) return <PublicPage />;
  if (user.profile.role === 'participant') return <ParticipantPage />;
  return <TrainerPage />;
};

export default HomePage;
